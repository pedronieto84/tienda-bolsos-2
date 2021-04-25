import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { producto } from 'src/app/interfaces/producto';
import { Filtro } from '../../interfaces/filtro';
import { CestaService } from '../../services/cesta.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: producto[] = []
  productosMostrar: producto[] = []

  constructor( 
    private db: AngularFirestore,
    private router: Router,
    private cestaServ: CestaService
    ) { 
  }

  filtrarProductos(filtro: Filtro){
    console.log('filtro que viene del hijo', filtro);

    /// filtrar primero el texto
    const arrayFiltrandoTexto = this.filtrarTexto( this.productos, filtro);

    /// filtro el precio
    const arrayFiltrandoPrecio = this.filtrarPrecio( arrayFiltrandoTexto, filtro);

    /// filtro el color
    const arrayFiltrandoColor = this.filtrarColor( arrayFiltrandoPrecio, filtro);

    /// filtro el tipo
    const arrayFiltrandoTipo = this.filtrarTipo( arrayFiltrandoColor, filtro);


    this.productosMostrar = [... arrayFiltrandoTipo];


  }


  filtrarTexto(array: producto[], filtro: Filtro): producto[]{
    const texto = filtro.texto;
    if(!texto){
      return array
    }else{
      return array.filter((producto: producto)=>{
        const nombre = producto.nombre.toLowerCase().trim()
        return nombre.includes(texto.toLowerCase().trim());
      })
    }
  }

  filtrarPrecio(array: producto[], filtro: Filtro): producto[]{
    console.log('FILTRO PRECIO', filtro)
    const precioMaximo = filtro.precio.precioMaximo;
    const precioMinimo = filtro.precio.precioMinimo;

    return array.filter((producto: producto)=>{
      const precioDeEsteProducto = this.cestaServ.precioFinal(producto);
      return ( precioDeEsteProducto > precioMinimo ) && ( precioDeEsteProducto < precioMaximo)
    })
  }

  filtrarColor(array: producto[], filtro: Filtro): producto[]{
    const color = filtro.color

    if(!color){
      return array
    }else{
        return array.filter((producto: producto)=>{
         
          const arrayDeColoresDisponibles = producto.colores;
          return arrayDeColoresDisponibles.includes(color)
      })
    }
  }

  filtrarTipo(array: producto[], filtro: Filtro): producto[]{
    const tipo = filtro.tipo;
    if(!tipo){
      return array
    }else{
      return array.filter((producto:producto)=>{
        return producto.tipo === tipo
      })
    }
  }

  ngOnInit(): void {
    this.db.collection('productos').valueChanges().subscribe(( res )=>{
      this.productos = res as producto[];
      this.filtrarProductos({
        precio:{
          precioMaximo: localStorage.getItem('precioMaximo') ? parseInt(localStorage.getItem('precioMaximo')) : 0,
          precioMinimo: localStorage.getItem('precioMinimo') ? parseInt(localStorage.getItem('precioMinimo')) : 100
      }});
   
    })
  }

  navegar(i){ 
    console.log('navegar', i);
    this.router.navigate([ 'detalle-producto',  i ])
  }

}
