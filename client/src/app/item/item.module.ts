import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import {AuthModule} from "../auth/auth.module";
import {NgxPaginationModule} from "ngx-pagination";
import {NgxLoadingModule} from "ngx-loading";
import { NewItemModalComponent } from './new-item-modal/new-item-modal.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [ListItemComponent, NewItemModalComponent],
  imports: [
    CommonModule,
    AuthModule,
    NgxPaginationModule,
    NgxLoadingModule,
    FormsModule
  ]
})
export class ItemModule { }
