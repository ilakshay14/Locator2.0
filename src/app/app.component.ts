/// <reference types="@types/googlemaps" />

import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @ViewChild('navChild') private myChild: NavbarComponent;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }
}
