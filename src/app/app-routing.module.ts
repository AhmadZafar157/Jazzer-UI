import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BasesComponent } from './components/bases/bases.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { TeamsComponent } from './components/teams/teams.component';
import { HomeComponent } from './components/home/home.component';
import { CreateNewBaseComponent } from './components/create-new-base/create-new-base.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {

    path: "login",
    component: LoginComponent

  },
  {

    path: "home",
    component: DashboardComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: HomeComponent,
      },
      {
        path: "segments",
        pathMatch: "full",
        component: BasesComponent
      },
      {
        path: "segments/create-new",
        component: CreateNewBaseComponent
      },
      {
        path: "campaigns",
        component: CampaignsComponent
      },
      {
        path: "teams",
        component: TeamsComponent

      }
    ]

  },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
