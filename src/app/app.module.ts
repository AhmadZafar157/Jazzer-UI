import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './layout/card/card.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BaseFormComponent } from './components/base-form/base-form.component';
import {MatSelectModule} from '@angular/material/select';
import { CompaignFormComponent } from './components/compaign-form/compaign-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ConnectTdComponent } from './components/connect-td/connect-td.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MyHttpInterceptor } from './http.interceptor';
import {MatChipsModule} from '@angular/material/chips';
import { BasesComponent } from './components/bases/bases.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { ShowBaseComponent } from './components/show-base/show-base.component';
import { ShowCampaignComponent } from './components/show-campaign/show-campaign.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    LoginComponent,
    SignupComponent,
    BaseFormComponent,
    CompaignFormComponent,
    DashboardComponent,
    ConnectTdComponent,
    BasesComponent,
    CampaignsComponent,
    ShowBaseComponent,
    ShowCampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatChipsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
