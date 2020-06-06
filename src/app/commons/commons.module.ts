import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './directives/loading.directive';
import { LayoutComponent } from './components/layout/layout.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule } from '@angular/router'

const materialModules = [MatIconModule, MatButtonModule, MatToolbarModule, RouterModule];
@NgModule({
  declarations: [LoadingDirective, LayoutComponent],
  imports: [
    CommonModule,
    materialModules
  ],
  exports: [LoadingDirective, LayoutComponent]
})
export class CommonsModule { }
