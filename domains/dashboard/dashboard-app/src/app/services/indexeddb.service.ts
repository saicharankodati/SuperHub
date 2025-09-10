import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private databaseName = 'ShellAppIDB';
  private databaseVersion = 1;
  private database: IDBDatabase | null = null;
  private isDatabaseReady: boolean = false;

  private _indexedDBSignal = signal<any | null>(null);
  public readonly indexedDBSignal = this._indexedDBSignal.asReadonly();

  constructor() {
    this.initializeIndexedDB();
  }

  private initializeIndexedDB(): void {
    const request = indexedDB.open(this.databaseName, this.databaseVersion);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('userContext')) {
        db.createObjectStore('userContext', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => {
      this.database = request.result;
      this.isDatabaseReady = true;
    };
    request.onerror = () => {
      console.error(request.error);
    };
  }

  async ready(): Promise<boolean> {
    if (this.isDatabaseReady)
      return true;

    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (this.isDatabaseReady) {
          clearInterval(check);
          resolve(true);
        }
      }, 10);
    });
  }

  async getAll(store: string): Promise<void> {
    if (!this.database?.objectStoreNames.contains(store))
      return new Promise<void>((resolve) => {
        this._indexedDBSignal.set([]);
        resolve();
      });

    return new Promise<void>((resolve) => {
      const request = this.database!.transaction(store, 'readonly').objectStore(store).getAll();
      request.onsuccess = (event) => {
        this._indexedDBSignal.set((event.target as IDBRequest).result);
        resolve();
      };
      request.onerror = () => {
        this._indexedDBSignal.set([]);
        resolve();
      };
    });
  }

  async get(store: string, key: IDBValidKey): Promise<void> {
    if (!this.database?.objectStoreNames.contains(store))
      return new Promise<void>((resolve) => {
        this._indexedDBSignal.set(null);
        resolve();
      });

    return new Promise<void>((resolve) => {
      const request = this.database!.transaction(store, 'readonly').objectStore(store).get(key);
      request.onsuccess = (event) => {
        this._indexedDBSignal.set((event.target as IDBRequest).result);
        resolve();
      };
      request.onerror = () => {
        this._indexedDBSignal.set(null);
        resolve();
      };
    });
  }

  async set(store: string, data: any): Promise<void> {
    if (!this.database?.objectStoreNames.contains(store))
      return new Promise<void>((resolve) => {
        this._indexedDBSignal.set(null);
        resolve();
      });

    return new Promise<void>((resolve) => {
      const request = this.database!.transaction(store, 'readwrite').objectStore(store).put(data);
      request.onsuccess = (event) => {
        this._indexedDBSignal.set((event.target as IDBRequest).result);
        resolve();
      };
      request.onerror = () => {
        this._indexedDBSignal.set(null);
        resolve();
      };
    });
  }

  async delete(store: string, key: IDBValidKey): Promise<void> {
    if (!this.database?.objectStoreNames.contains(store))
      return new Promise<void>((resolve) => {
        this._indexedDBSignal.set(null);
        resolve();
      });

    return new Promise<void>((resolve) => {
      const request = this.database!.transaction(store, 'readwrite').objectStore(store).delete(key);
      request.onsuccess = (event) => {
        this._indexedDBSignal.set((event.target as IDBRequest).result);
        resolve();
      };
      request.onerror = () => {
        this._indexedDBSignal.set(null);
        resolve();
      };
    });
  }

  async clear(store: string): Promise<any> {
    if (!this.database?.objectStoreNames.contains(store))
      return new Promise<void>((resolve) => {
        this._indexedDBSignal.set(null);
        resolve();
      });

    return new Promise<void>((resolve) => {
      const request = this.database!.transaction(store, 'readwrite').objectStore(store).clear();
      request.onsuccess = (event) => {
        this._indexedDBSignal.set((event.target as IDBRequest).result);
        resolve();
      };
      request.onerror = () => {
        this._indexedDBSignal.set(null);
        resolve();
      };
    });
  }

  close(): void {
    this.database?.close();
    this.database = null;
  }

  clearSignals(): void {
    this._indexedDBSignal.set(null);
  }
}
