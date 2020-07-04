import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GroupComponent } from './components/group/group.component';
import { GroupInfoComponent } from './components/group-info/group-info.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal',
    pathMatch: 'full'
  },
  {
    path: 'personal',
    component: HomeComponent
  },
  {
    path: 'group',
    component: GroupComponent
  },
  {
    path: 'group/:id',
    component: GroupInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
