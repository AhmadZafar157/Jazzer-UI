import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './layout/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BaseFormComponent } from './components/base-form/base-form.component';
import { MatSelectModule } from '@angular/material/select';
import { CompaignFormComponent } from './components/compaign-form/compaign-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConnectTdComponent } from './components/connect-td/connect-td.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MyHttpInterceptor } from './http.interceptor';
import { MatChipsModule } from '@angular/material/chips';
import { BasesComponent } from './components/bases/bases.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { ShowBaseComponent } from './components/show-base/show-base.component';
import { ShowCampaignComponent } from './components/show-campaign/show-campaign.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { ShowTeamComponent } from './components/show-team/show-team.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './components/home/home.component';
import { CreateNewBaseComponent } from './components/create-new-base/create-new-base.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartComponent } from './layout/graphs/chart/chart.component';

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
    ShowCampaignComponent,
    TeamsComponent,
    TeamFormComponent,
    ShowTeamComponent,
    HomeComponent,
    CreateNewBaseComponent,
    ChartComponent,

  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
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
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatCheckboxModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
