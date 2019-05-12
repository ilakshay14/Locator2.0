import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  userLogIn(form: NgForm) {
    //console.log(form.value);
    this.appService.userLogin(form.value.username)
  }

}
