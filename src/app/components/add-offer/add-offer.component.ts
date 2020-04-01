import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  titre: string;
  prix: string;
  description: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private offerService: OffersService
  ) { }

  ngOnInit(): void {
  }
  onAddOffer() {
    if (!this.titre || !this.prix || !this.description) {
      this.flashMessage.show('complete the fields', { cssClass: 'alert-danger'});
      return false ;
    }
    {
      const  offer = {
        titre: this.titre,
        prix: this.prix,
        description: this.description
       }
      this.offerService.saveOffer(offer).subscribe(
         (resp: any) => {
          if (!resp.success) {
            this.flashMessage.show("all fields are required", { cssClass: 'alert-danger'});
             return false;
          }
          this.flashMessage.show('offer saved', { cssClass: 'alert-success' }) ;
          this.router.navigate(['/main']);
          console.log(resp);
  /*
          this.flashMessage.show('offer saved', { cssClass: 'alert-success'});
          this.router.navigate[('/main')];
           console.log(resp);*/
         });
    }
  }
}
