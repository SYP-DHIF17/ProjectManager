import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { RegisterComponent } from './components/register/register.component';
import { MatSidenavModule } from "@angular/material/sidenav"

import { HttpClientModule } from "@angular/common/http";
import { ManagementPanelComponent } from './components/managament-panel/management-panel/management-panel.component';
import { SidebarComponent } from './components/managament-panel/sidebar/sidebar.component';
import { HeaderComponent } from './components/managament-panel/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    RegisterComponent,
    ManagementPanelComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//https://medium.muz.li/dashboards-inspiration-2018-77b3ab185483
