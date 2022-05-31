/* eslint-disable @typescript-eslint/prefer-for-of */
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { PaiementService } from '../services/paiement.service';
import { Paiement } from '../model/paiement.model';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { VerifAuthenticationPage } from '../verif-authentication/verif-authentication.page';
import { FactureService } from '../services/facture.service';

@Component({
  selector: 'app-historique-paiement',
  templateUrl: './historique-paiement.page.html',
  styleUrls: ['./historique-paiement.page.scss'],
})
export class HistoriquePaiementPage implements OnInit {
  listePaiement = [];
  listeData = [];
  list = [];
  p = new Paiement();
  constructor(
    private paiementService: PaiementService,
    private toast: ToastController,
    private dataService: DataService,
    private factureService: FactureService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public authService: AuthentificationService
  ) {}

  ngOnInit(): void {

    this.listePaiement = this.paiementService.lister();
    console.log(this.listePaiement);

  }
  
  /*transfererPaiement() {

    console.log(this.listePaiement);
      for (let i=0;i < this.listePaiement.length;i++) {

    console.log(this.listePaiement[i].paiement);
      this.list.push(this.listePaiement[i].paiement);
     //
     this.paiementService.payerFactures(this.listePaiement[i].paiement).subscribe(paiementeffec=>{
       console.log('le paiement efectué est', paiementeffec);
       const facturesList=this.listePaiement[i].paiement.factures;
       for(let j=0; j<facturesList.length ;j++)
       {
          facturesList[j].paiement=paiementeffec;
          console.log('inside the fact : ',facturesList[j].paiement);
       }
       this.paiementService.modifierFactures(facturesList).subscribe(paiement=>{

            console.log('le paiement des factures effectué',paiement);
       });
       console.log(facturesList);
     });
  }
}*/
transfererPaiement() {
  //  this.listePaiement=this.paiementService.lister();
  console.log(this.listePaiement);

  for (let i = 0; i < this.listePaiement.length; i++) {
this.paiementService.ajouterPaiement(this.listePaiement[i].paiement).subscribe(
pai=>{
  let listfact2=this.listePaiement[i].paiement.factures;
  for(let j=0;j<listfact2.length;j++){
    listfact2[j].paiement=pai;
  }
  this.paiementService.PayerFacture(listfact2).subscribe(p=>{
    console.log("facture payé",p);
  });

}
)

  }
  console.log(this.p);
 // this.paiementService.payerFactures(this.list).subscribe((p) => {});
}


  async openModal() {

    const modal = await this.modalController.create({
      component: VerifAuthenticationPage,
      componentProps: {

      },
    });

    modal.onDidDismiss().then(async (dataReturned) => {
      if (dataReturned.data === 'ok') {
        console.log(dataReturned.data);
        //this.modifierFacture();
        this.paiementService.deletePaiement();
        this.transfererPaiement();

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '',
        subHeader: '',
        message:
          'Le transfer des Paiements est effectué convenablement ',
        buttons: ['OK'],//this.router.navigate(['/facture'])
      });
      await alert.present();
      }
      window.location.reload();
    });

    return await modal.present();
  }












  paiement(){
    this.router.navigateByUrl('/facture');
  }
  historique(){
    this.router.navigateByUrl('/historique-paiement');
  }

  acceuil(){
    this.router.navigateByUrl('/folder/:id');


  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'A propos',

      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Modifier profil',
          icon: 'person-add-outline',
          data: 5,
          handler: () => {
            this.router.navigateByUrl('/modifier-profile');
          }
        },
        {
        text: 'Deconnexion',
        icon: 'log-out-outline',
        data: 5,
        handler: () => {
          this.authService.logout();
          this.paiementService.deleteAll();
          this.router.navigateByUrl('/authentification');
        },

      },

      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
