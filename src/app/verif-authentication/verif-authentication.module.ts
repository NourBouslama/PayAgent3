import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifAuthenticationPageRoutingModule } from './verif-authentication-routing.module';

import { VerifAuthenticationPage } from './verif-authentication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifAuthenticationPageRoutingModule
  ],
  declarations: [VerifAuthenticationPage]
})
export class VerifAuthenticationPageModule {}
