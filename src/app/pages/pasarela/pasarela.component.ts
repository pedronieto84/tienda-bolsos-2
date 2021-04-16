import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.scss']
})
export class PasarelaComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  volver(){
    this.location.back();
  }

}
