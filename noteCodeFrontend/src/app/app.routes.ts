import { Routes } from '@angular/router';
import { EditorPageComponent } from './editor/editor-page.component';

export const routes: Routes = [
  { path: '', component: EditorPageComponent },
  { path: ':id', component: EditorPageComponent },
];
