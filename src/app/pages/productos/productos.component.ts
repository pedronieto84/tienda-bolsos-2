import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {


  bolsos = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

  constructor(
    private db: AngularFirestore,
    private router: Router

    ) {


  }

  ngOnInit(): void {

    this.db.collection('bolsos').valueChanges().subscribe((res)=>{
      console.log('RES', res)
      })
    }


    navegar(i){
      console.log('navegar', i);
      //this.router.navigate(['detalle-producto', i])
      this.router.navigateByUrl(`detalle-producto/${i}`);
    }




  }
