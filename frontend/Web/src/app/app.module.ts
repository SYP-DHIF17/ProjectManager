import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { RegisterComponent } from './components/register/register.component';

import { HttpClientModule } from "@angular/common/http";
import { ManagementPanelComponent } from './components/management-panel/management-panel/management-panel.component';
import { SidebarComponent } from './components/management-panel/sidebar/sidebar.component';
import { HeaderComponent } from './components/management-panel/dashboard/header/header.component';
import { DashboardComponent } from './components/management-panel/dashboard/dashboard/dashboard.component';
import { VersionComponent } from './components/management-panel/dashboard/version/version.component';
import { ProjectsComponent } from './components/management-panel/projects/projects.component';
import { ProjectItemComponent } from './components/management-panel/projects/project-item/project-item.component';
import { AddProjectComponent } from './components/management-panel/projects/add-project/add-project.component';
import { ProjectDetailsComponent } from './components/management-panel/dashboard/project-details/project-details.component';
import { NgbModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTeamComponent } from './components/management-panel/projects/add-team/add-team.component';
import { NotificationPopUpComponent } from '@components/shared/notification-pop-up/notification-pop-up.component';
import { DialogComponent } from '@components/shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    RegisterComponent,
    ManagementPanelComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    VersionComponent,
    ProjectsComponent,
    ProjectItemComponent,
    AddProjectComponent,
    ProjectDetailsComponent,
    AddTeamComponent,
    NotificationPopUpComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//https://medium.muz.li/dashboards-inspiration-2018-77b3ab185483
