import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlannerMainComponent } from './components/planner-main/planner-main.component';
import { PlanLayoutComponent } from './layout/plan-layout/plan-layout.component';
import { PlanDetailsComponent } from './components/planner-main/plan-details-component/plan-details-component.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: 'plans',
        component: PlanLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: PlannerMainComponent },
            { path: ':planId', component: PlanDetailsComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
];
