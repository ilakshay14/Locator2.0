import { Injectable } from "@angular/core";
import axios from "axios";
import { HttpHeaders } from '@angular/common/http'
import { resolve } from 'q';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor() { }

  private user;

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

  userSetup(userDetails) {
    axios.post(
      'http://localhost:3000/auth/signup', {
        user: userDetails
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUser(userID) {
    return axios.get('http://localhost:3000/auth/getProfile', {
      params: {
        user: userID
      }
    }
    ).then(response => {
      //console.log(response);
      return response;
    }).catch(error => {
      console.log(error);
    });
  }

}
