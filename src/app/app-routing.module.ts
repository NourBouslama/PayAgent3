import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'authentification',
    pathMatch: 'full'
  },
 
  {
    path: 'authentification',
    loadChildren: () => import('./authentification/authentification.module').then( m => m.AuthentificationPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'facture',
    loadChildren: () => import('./facture/facture.module').then( m => m.FacturePageModule)
  },
  {
    path: 'storage-paiement',
    loadChildren: () => import('./storage-paiement/storage-paiement.module').then( m => m.StoragePaiementPageModule)
  },
  {
    path: 'paiement',
    loadChildren: () => import('./paiement/paiement.module').then( m => m.PaiementPageModule)
  },
   
{
path: 'historique-paiement',
loadChildren: () => import('./historique-paiement/historique-paiement.module').then( m => m.HistoriquePaiementPageModule)
},
{
path: 'modifier-profile',
loadChildren: () => import('./modifier-profile/modifier-profile.module').then( m => m.ModifierProfilePageModule)
},
  {
    path: 'verif-authentication',
    loadChildren: () => import('./verif-authentication/verif-authentication.module').then( m => m.VerifAuthenticationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
