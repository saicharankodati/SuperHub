import { signal } from '@angular/core';

const storedToken = localStorage.getItem('access_token');
export const signal_AccessToken = signal<string | null>(storedToken);
