import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {


  bolsos = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

  constructor(private db: AngularFirestore) {





  }

  ngOnInit(): void {

    this.db.collection('bolsos').valueChanges().subscribe((res)=>{
      console.log('RES', res)
      })

    }
  }
