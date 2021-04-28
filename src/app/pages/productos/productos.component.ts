import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { producto } from 'src/app/interfaces/producto';
import { Filtro } from '../../interfaces/filtro';
import { CestaService } from '../../services/cesta.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: producto[] = []
  productosMostrar: producto[] = []
  elementosFavoritos = ( localStorage.getItem('elementosFavoritos') ) ? localStorage.getItem('elementosFavoritos').split(',')  :  []

  
  // chaining methods, o encadenar metodos

  
  // brooklyn,necesser,billetra-hombre
  // undefined, null, -234324, '', false ---- >      FALSE 
  // existe este elemento en el localStorage ? Si existe me lo asignas a esta propiedad

  // si no existe le asignamos un empty array

  // si existe el string, tendre que hacer algo hay un metodo aplicable alos strings,
  // que ese string me lo va a 
  // convertir a formato array

  constructor( 
    private db: AngularFirestore,
    private router: Router,
    private cestaServ: CestaService
    ) { 
      console.log('ELEMENTOS FAVORITOS al INICIALIZAR', this.elementosFavoritos);
      console.log('ARRAY A TO STRING', this.elementosFavoritos.toString())
  }


  selectFavorite(producto: producto){
    ( this.elementosFavoritos.indexOf(producto.url) >= 0 ) ?  null  :  this.elementosFavoritos.push(producto.url) 
    console.log('ELEMENTOS FAVORITOS', this.elementosFavoritos);
    localStorage.setItem('elementosFavoritos', this.elementosFavoritos.toString())
    // coger un string y convertirlo en array

  }






  deselectFavorite(producto: producto){
    console.log('desselect produ', producto);
    console.log('ID A DESSELECCIONAR', producto.url) 
    /// INPUTS
    // array de elementosfavoritos
    // producto que hay que desseleccionar, que se llama producto
    const idProductoADeseleccionar = producto.url; // 'billetera-hombre'
    // 1.  [ 'brooklyn', 'neceser-carpincho', 'billetera-hombre'];
    // devuelve un numero, si es positivo, es que esta dentro del array, si es negativo es que no esta
    const index = this.elementosFavoritos.indexOf(producto.url);
 

    // 2. // eliminarlo si existe en el array;

    if(  index >= 0  ){
      console.log('INDEX')
      this.elementosFavoritos.splice( index , 1  );

      localStorage.setItem('elementosFavoritos', this.elementosFavoritos.toString())
      // elementosFavoritos 
      console.log('elementos favoritos despues del splice', this.elementosFavoritos)
      // quiero que este array elementos, guardarlo en el localStorage

// si el elemento esta en el array lo elimino
    }else{
// si no esta en el array, no hago nada
    }
  


    /// RESULTADO

    // quitar del array de productos favoritos un elemento

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




  filtrarTexto(array: producto[], filtro: Filtro)  : producto[]{


    const texto = filtro.texto; 

    // no es verdad , o que no existe , o que es null, o que es false; -1, '', null, undefined,

    if(! texto){
      return array
    } else {
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
    if( !color || ( color === 'todos' ) ){ // si el color es igual a 'todos'
      return array // no apliques ningun filtro
    }else{
        return array.filter((producto: producto)=>{
          const arrayDeColoresDisponibles = producto.colores;
          return arrayDeColoresDisponibles.includes(color)
      })
    }
  }

  filtrarTipo(array: producto[], filtro: Filtro): producto[]{
    const tipo = filtro.tipo; // si el tipo es 'todos'
    if( !tipo || (tipo === 'todos')   ){ // no apliques ningun filtro
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
      },
      tipo: localStorage.getItem('tipo') ? localStorage.getItem('tipo') : 'todos',
      color: localStorage.getItem('color') ? localStorage.getItem('color') : 'todos',
      texto: localStorage.getItem('texto') ? localStorage.getItem('texto') : null,
      });
   
    })
  }

  navegar(i){ 
    console.log('navegar', i);
    this.router.navigate([ 'detalle-producto',  i ])
  }

}
