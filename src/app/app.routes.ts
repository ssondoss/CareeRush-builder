import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { CvEditorComponent } from '../builder/cv-editor/cv-editor.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
    { path: 'builder', component: CvEditorComponent },



];
