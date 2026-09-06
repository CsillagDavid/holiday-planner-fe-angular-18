import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlannerMainComponent } from './components/planner-main/planner-main.component';
import { PlanLayoutComponent } from './layout/plan-layout/plan-layout.component';
import { PlanDetailsComponent } from './components/planner-main/plan-details-component/plan-details-component.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HikePlanPageComponent } from './pages/hike-plan-page/hike-plan-page.component';
import { SharedHikesComponent } from './components/shared-hikes/shared-hikes.component';
import { SharedHikeComponent } from './components/shared-hike/shared-hike.component';
import { EditSharedHikeComponent } from './components/shared-hikes/edit-shared-hike/edit-shared-hike.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'plans',
                component: PlanLayoutComponent,
                children: [
                    { path: '', component: PlannerMainComponent },
                    { path: ':planId', component: PlanDetailsComponent }
                ]
            },
            {
                path: 'hike-plans',
                component: HikePlanPageComponent
            },
            {
                path: 'shared-hikes',
                component: SharedHikesComponent,
            },
            { path: 'shared-hikes/:id', component: EditSharedHikeComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'shared-hike', children: [{
            path: '',
            redirectTo: '/',
            pathMatch: 'full'
        },
        { path: ':id', component: SharedHikeComponent }]
    },
    { path: '**', redirectTo: '' },
];
