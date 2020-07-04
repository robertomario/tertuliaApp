import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './directives/loading.directive';
import { LayoutComponent } from './components/layout/layout.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component'

const materialModules = [MatIconModule, MatButtonModule, MatToolbarModule, RouterModule];
@NgModule({
  declarations: [LoadingDirective, LayoutComponent, ProductComponent],
  imports: [
    CommonModule,
    materialModules
  ],
  exports: [LoadingDirective, LayoutComponent, ProductComponent]
})
export class CommonsModule { }
