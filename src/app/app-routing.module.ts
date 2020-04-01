import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { LoginGuard } from './guards/login.guard';
import { AddOfferComponent } from './components/add-offer/add-offer.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'main', component:MainComponent, canActivate: [LoginGuard]},
  {path: 'addOffer', component:AddOfferComponent, canActivate: [LoginGuard]},
  {path: 'navbar', component:NavbarComponent},
  {path: 'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
