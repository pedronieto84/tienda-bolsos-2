import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  idProducto;
  producto;

  constructor(private router: Router , private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.idProducto = this.router.url.split('/')[2];
    this.afs.collection('productos').doc(this.idProducto).get().toPromise().then((res)=>{
      this.producto = res.data
    })
  }


  volver(){
    this.router.navigateByUrl('productos');
  }

  pagar(){
    this.router.navigateByUrl('pasarela');
  }

}
