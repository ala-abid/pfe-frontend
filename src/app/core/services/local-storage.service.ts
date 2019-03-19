import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }
  store(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  retrieve(key) {
    return localStorage.getItem(key);
  }
  delete(key) {
    return localStorage.removeItem(key);
  }
}
