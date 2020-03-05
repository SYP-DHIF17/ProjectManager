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
import { TicketsComponent } from './components/management-panel/dashboard/tickets/tickets.component';
import { CalendarComponent } from './components/management-panel/dashboard/calendar/calendar.component';

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
    TicketsComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//https://medium.muz.li/dashboards-inspiration-2018-77b3ab185483
