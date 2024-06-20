import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  static instance: LoaderService;

  fetched = signal(true);
  editorInit = signal(false);

  constructor() {
    LoaderService.instance = this;
  }
}
