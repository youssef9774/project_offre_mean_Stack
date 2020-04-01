import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  first_name: string;
  last_name: string;
  email: string;
  password: string;
  adresse: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {}


  onRegister() {
    const user = {
      first_name: this.first_name,
       last_name: this.last_name,
       email: this.email,
       password: this.password,
       adresse: this.adresse
    }

    this.userService.createAccount(user).subscribe(
          (res) => {
            if (!this.first_name ||  !this.email || !this.password ){
            this.flashMessage.show('all fields are required', { cssClass: 'alert-danger' }) ;
            return false;
            }
            {

              this.flashMessage.show('user saved ', { cssClass: 'alert-success' }) ;
              return this.router.navigate(['/login']);
            }
          }
    );
  }
  }



