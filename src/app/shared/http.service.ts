import { Injectable } from "@angular/core";
import axios from "axios";
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor() { }

  userLogin(username: string, password: string) {
    //console.log(`username ${username} and password ${password}`);

    axios.get(
      'http://localhost:3000/auth/login'
    )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
