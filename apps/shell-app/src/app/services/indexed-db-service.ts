import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private databaseName = 'ShellAppIDB';
  private databaseVersion = 1;
  private database: IDBDatabase | null = null;

  constructor() {
    this.initIndexedDB();
  }

  private initIndexedDB(): void {
    const request = indexedDB.open(this.databaseName, this.databaseVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }

      if (!db.objectStoreNames.contains('cache')) {
        db.createObjectStore('cache', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('session')) {
        db.createObjectStore('session', { keyPath: 'userId' });
      }
    };

    request.onsuccess = () => {
      this.database = request.result;
    };

    request.onerror = () => {
      console.error('IndexedDB init failed:', request.error);
    };
  }

  async set(store: string, data: any): Promise<void> {
    if (!this.database) throw new Error('DB not initialized');

    return new Promise((resolve, reject) => {
      const tx = this.database!.transaction(store, 'readwrite');
      const objectStore = tx.objectStore(store);
      const request = objectStore.put(data);

      request.onerror = () => reject(request.error);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(new Error('Transaction aborted'));
    });
  }

  async get(store: string, key: string): Promise<any> {
    if (!this.database) throw new Error('DB not initialized');

    return new Promise((resolve, reject) => {
      const tx = this.database!.transaction(store, 'readonly');
      const objectStore = tx.objectStore(store);
      const request = objectStore.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(store: string, key: string): Promise<void> {
    if (!this.database) throw new Error('DB not initialized');

    return new Promise((resolve, reject) => {
      const tx = this.database!.transaction(store, 'readwrite');
      const objectStore = tx.objectStore(store);
      const request = objectStore.delete(key);

      request.onerror = () => reject(request.error);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async clear(store: string): Promise<void> {
    if (!this.database) throw new Error('DB not initialized');

    return new Promise((resolve, reject) => {
      const tx = this.database!.transaction(store, 'readwrite');
      const objectStore = tx.objectStore(store);
      const request = objectStore.clear();

      request.onerror = () => reject(request.error);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  close(): void {
    this.database?.close();
    this.database = null;
  }
}
