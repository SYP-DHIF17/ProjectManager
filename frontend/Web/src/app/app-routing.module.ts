import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ManagementPanelComponent } from './components/management-panel/management-panel/management-panel.component';
import { DashboardComponent } from './components/management-panel/dashboard/dashboard/dashboard.component';
import { ProjectsComponent } from './components/management-panel/projects/projects.component';
import { AddProjectComponent } from './components/management-panel/projects/add-project/add-project.component';
import { ProjectDetailsComponent } from '@components/management-panel/dashboard/project-details/project-details.component';
import { AddTeamComponent } from '@components/management-panel/projects/add-team/add-team.component';
import { AddProjectPartComponent } from '@components/management-panel/projects/add-project-part/add-project-part.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: ManagementPanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'project/add',
        component: AddProjectComponent
      },
      {
        path: 'project/:id',
        component: ProjectDetailsComponent
      },
      {
          path: 'project/:id/teams/add',
          component: AddTeamComponent
      },
      {
        path: 'project/:id/parts/add',
        component: AddProjectPartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
