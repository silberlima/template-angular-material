import { AuthGuard } from '../auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  { path: '', component: PersonComponent , canActivate:[AuthGuard]},
  { path: ':id', component: PersonDetailComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeoresRoutingModule {}
