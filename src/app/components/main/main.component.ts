import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';
import { OffersService } from 'src/app/services/offers.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

   offers: any;


  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router,
    private offerService: OffersService
  ) { }

  ngOnInit(): void {
  this.fetchOffer();

}
  private fetchOffer() {
    this.offerService.getOffer().subscribe(
      (resp: any) => {
        console.log(resp);
        this.offers = resp.offre;
      }
    )
  }

  deleteOffer(id) {
    this.offerService.deleteOffer(id).subscribe(
      (resp:any) => {
        console.log(id);
        if(!resp.success) {
          this.flashMessage.show('error', { cssClass : 'alert-danger '});
        }else{
          this.fetchOffer();
          this.flashMessage.show('Offer Deleted', { cssClass : 'alert-success '});
        }

        this.router.navigate(['/main']);
      }
    );
  }


  updateOffer(id) {
    this.offerService.updateOffer(id).subscribe(
      (resp:any) => {

        if(!resp.success) {
          this.flashMessage.show('error', { cssClass : 'alert-danger '});
        }else{
          this.fetchOffer();
          this.flashMessage.show('Offer Deleted', { cssClass : 'alert-success '});
        }

        this.router.navigate(['/main']);
      }
    );
  }

}
