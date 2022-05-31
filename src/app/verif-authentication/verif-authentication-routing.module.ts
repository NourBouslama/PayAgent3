import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifAuthenticationPage } from './verif-authentication.page';

const routes: Routes = [
  {
    path: '',
    component: VerifAuthenticationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifAuthenticationPageRoutingModule {}
