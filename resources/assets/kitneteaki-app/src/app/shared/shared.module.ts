import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KzCepPipe, KzCnpjPipe, KzCpfPipe, KzCpfCnpjPipe} from './pipes';
import {KzCpfValidatorDirective, KzCnpjValidatorDirective, KzCpfCnpjValidatorDirective, KzMaskDirective, KzMaskCurrencyDirective, KzPikadayDirective} from './directives';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    KzCepPipe,
    KzCpfPipe,
    KzCnpjPipe,
    KzCpfCnpjPipe,
    KzCpfValidatorDirective,
    KzCnpjValidatorDirective,
    KzCpfCnpjValidatorDirective,
    KzMaskDirective,
    KzMaskCurrencyDirective,
    KzPikadayDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KzCepPipe,
    KzCpfPipe,
    KzCnpjPipe,
    KzCpfCnpjPipe,
    KzCpfValidatorDirective,
    KzCnpjValidatorDirective,
    KzCpfCnpjValidatorDirective,
    KzMaskDirective,
    KzMaskCurrencyDirective,
    KzPikadayDirective,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
