import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PasarelaComponent } from './pages/pasarela/pasarela.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';




const config = {
  apiKey: "AIzaSyBJ6HIsDaHjhia4_Vmk9eYpon2HlCrPAgg",
  authDomain: "tienda-bolsos-fb985.firebaseapp.com",
  projectId: "tienda-bolsos-fb985",
  storageBucket: "tienda-bolsos-fb985.appspot.com",
  messagingSenderId: "21395641892",
  appId: "1:21395641892:web:654904e2a16b2ca211aab1",
  measurementId: "G-4N85KCCXHX"
}


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ContactoComponent,
    PasarelaComponent,
    DetalleProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
