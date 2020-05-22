import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from './../commons/commons.module'

//Material modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input'

// Components
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { NgxMaskModule } from 'ngx-mask';

const materialModules = [MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatInputModule];

@NgModule({
  declarations: [HomeComponent, AddProductModalComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    CommonsModule,
    NgxMaskModule,
    ...materialModules
  ]
})
export class HomeModule { }
