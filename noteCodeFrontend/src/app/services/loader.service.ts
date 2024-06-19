import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  static instance: LoaderService;

  loaded = signal(true);

  constructor() {
    LoaderService.instance = this;
  }
}
