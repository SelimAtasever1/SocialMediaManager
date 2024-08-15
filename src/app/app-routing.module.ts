import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './organisms/auth/auth.component';
import { DataTableComponent } from './organisms/data-table/data-table.component';
import { authGuard } from './shared/guards/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },  
  { path: 'auth', component: AuthComponent },
  { path: 'links', component: DataTableComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'auth' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
