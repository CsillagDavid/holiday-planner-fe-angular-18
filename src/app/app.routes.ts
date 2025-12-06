import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlannerMainComponent } from './components/planner-main/planner-main.component';
import { PlanLayoutComponent } from './layout/plan-layout/plan-layout.component';
import { PlanDetailsComponent } from './components/planner-main/plan-details-component/plan-details-component.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '',
                component: HomeComponent
            },
            {
            path: 'plans',
            component: PlanLayoutComponent,
            children: [
                { path: '', component: PlannerMainComponent },
                { path: ':planId', component: PlanDetailsComponent }
            ]
        },]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' },
];
