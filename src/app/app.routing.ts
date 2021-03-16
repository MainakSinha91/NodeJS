  
﻿import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


import { MessageComponent } from './posts/message/message.component';
import { AuthGuard } from './services/auth-guard';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'messages', component: MessageComponent,canActivate: [AuthGuard]},
    { path: '*', redirectTo: 'login' }
];

export const appRouting = RouterModule.forRoot(appRoutes);