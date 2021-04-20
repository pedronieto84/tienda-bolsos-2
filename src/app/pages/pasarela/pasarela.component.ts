import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.scss']
})
export class PasarelaComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private location: Location,
    private _formBuilder: FormBuilder,
    private db: AngularFirestore
    ) { }

    ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required, Validators.maxLength(100)],
      direccion: ['', Validators.required, Validators.maxLength(1000)],
      telefono: ['', Validators.required],
      email: ['', Validators.required, Validators.email],

      });
      this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
      });
      }

    volver(){
    this.location.back()
    }

    guardar(){
      // Extraer datos formulario

      const data = this.firstFormGroup.value
      console.log('DATA', data)

      //Insertarlos en la base de datos

      this.db.collection('pedidos').add(data);
      console.log('guardar', data)

    }

    }
