import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  password: string;


  constructor(
    private flashMessage: FlashMessagesService,
    private userService: UserService,
    private router: Router

    ) { }

  ngOnInit() {}


  onLogin() {
    const user = {
      email: this.email,
      password: this.password
    }


    if (  !this.email || !this.password  ) {
    this.flashMessage.show('all fields are required', { cssClass: 'alert-danger' }) ;
    return  false;
  }

    this.userService.login(user).subscribe(
     ( resp: any) => {
        if (!resp.success) {
          this.flashMessage.show( "all fields are required", { cssClass: 'alert-danger'});
          return false;
        }
        this.userService.saveUserDate(resp.user.token , resp.user );
        this.flashMessage.show('success', { cssClass: 'alert-success' }) ;
        this.router.navigate(['/main']);
        console.log(resp);
    }

    );

}
}
