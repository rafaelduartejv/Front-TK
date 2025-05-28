import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registro/registrar.component';
import { HomeComponent } from './pages/home/home.component';
import { EnderecosComponent } from './pages/enderecos/enderecos.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'enderecos', component: EnderecosComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];