import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  volver(){
    this.router.navigateByUrl('productos');
  }

  pagar(){
    this.router.navigateByUrl('pasarela');
  }

}
