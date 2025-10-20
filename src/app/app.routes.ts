import { Routes } from '@angular/router';

import { Home } from './home/home';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: Home }
];
