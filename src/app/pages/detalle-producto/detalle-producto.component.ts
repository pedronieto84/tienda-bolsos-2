import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { cestaItem } from '../../interfaces/cestaItem';
import { CestaService } from '../../services/cesta.service';
import { producto } from 'src/app/interfaces/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  idProducto: string;
  producto: producto; 
  color: string;
  cantidad: number = 1;
  showAgregar: boolean = false;
  showPagar: boolean = false;

  constructor(
    private router: Router, 
    private afs: AngularFirestore,
    private cestaServ: CestaService,
    private _snackBar: MatSnackBar
    ) { 
    }

  ngOnInit(): void {
    this.idProducto = this.router.url.split('/')[2];
    this.afs.collection('productos').doc(this.idProducto).get().toPromise().then((productoDelaBaseDeDatos)=>{
      this.producto = productoDelaBaseDeDatos.data() as producto;
    })

    this.cestaServ.importeFinal$.subscribe(( importeFinal: number )=>{
      this.showPagar =  ( importeFinal > 0  ) ? true : false;
    })
  }

  volver(){ 
    this.router.navigateByUrl('productos')
  }

  pagar(){
    this.router.navigateByUrl('pasarela')
  }

  seleccionoColor(color:string){
    this.color = color;
    this.showAgregarF()
  }

  showAgregarF(){
    if(this.cantidad > 0){
      this.showAgregar = true;
    }else{
      this.showAgregar = false;
    }
  }

  agregar(){
    const item: cestaItem = {
      id: this.idProducto,
      color: this.color,
      cantidad: this.cantidad,
      precio: this.producto.precio,
      precioOferta: this.producto.precioOferta
    }
    this.cestaServ.addProductoToArray(item);
    this._snackBar.open('¡Producto añadido exitosamente!', null, {
      duration: 1000
    });
  }

  add(){
    this.cantidad += 1;
    this.showAgregarF();
  }

  remove(){
    this.cantidad === 0 ? null : this.cantidad -=1
    this.showAgregarF();
    this._snackBar.open('¡Producto quitado!', null, {
      duration:1000
    });
  }


}


