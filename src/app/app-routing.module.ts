import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BaseFormComponent } from './components/base-form/base-form.component';
import { CompaignFormComponent } from './components/compaign-form/compaign-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamFormComponent } from './components/team-form/team-form.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  //  { 

  //   path: "signup",
  // 	component: SignupComponent

  //   },
  {

    path: "login",
    component: LoginComponent

  },
  {

    path: "dashboard",
    component: DashboardComponent

  },
  // { 

  //   path: "create-base",
  //   component: BaseFormComponent

  //   },
  //   { 

  //     path: "create-campaign",
  //     component: CompaignFormComponent

  //     },
  //     { 

  //       path: "create-team",
  //       component: TeamFormComponent

  //       },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
