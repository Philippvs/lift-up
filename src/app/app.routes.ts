import {Routes} from '@angular/router';
import {authGuard} from "./auth/auth.guard";
import {AdminComponent} from "./pages/admin/admin.component";
import {LoginComponent} from "./pages/login/login.component";
import {LiveDataComponent} from "./pages/live-data/live-data.component";
import {HistoryComponent} from "./pages/history/history.component";
import {NotificationComponent} from "./notification/notification.component";

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },

    {
        path: 'admin', component: AdminComponent, canActivate: [authGuard]
    },
    {
        path: 'charts', component: LiveDataComponent, canActivate: [authGuard]
    },
    {
        path: 'history', component: HistoryComponent, canActivate: [authGuard]
    },
    {
        path: 'notification', component: NotificationComponent, canActivate: [authGuard]
    }
];
