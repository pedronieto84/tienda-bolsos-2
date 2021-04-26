import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { render } from 'creditcardpayments/creditCardPayments';  

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.scss']
})
export class PasarelaComponent implements OnInit, AfterViewInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor( 
    private location: Location,
    private _formBuilder: FormBuilder,
    private db: AngularFirestore
    ) {

 
     }

  ngOnInit() {

    // cargais el pasarelaObject, le haceis un JSON.parse, y cada uno de los 
    // datos lo vais poniendo en el formGroup, el nombre, direccion, telefono, emeila,
    //
    /* aqui tendre que cargar el dato de localStorage */





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

  ngAfterViewInit(){
    render({
      id: '#myPaypalButtons', 
      currency: 'USD',
      value: '100.00',
      onApprove: (details)=>{
        console.log('COBRO EXITOSO', details);
        alert('COBRO EXITOSO')
      }
    })
  }

  get form(){
    return this.firstFormGroup.controls
  }

  volver(){
    this.location.back()
  }

  guardar(){

    // JSON.stringify tendre que guardarlo el objeto en localStorage
     // {nombre, email, direccion, telefono}  //  pasarelaObject

    // 1. Extraer los datos del formulario.
    const data = this.firstFormGroup.value
    // 2. Insertarlos en la base de datos.
    this.db.collection('pedidos').add(data);
    console.log('guardar', data)
  }

}
