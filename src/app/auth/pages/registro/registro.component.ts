import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator.service';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaiones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fbuilder.group({
    nombre: ['',[Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['',[Validators.required, Validators.pattern(this.vs.emailPattern)]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  },
  {
    Validators: [this.vs.camposIguales('password','passwords2')]
  });

  constructor(private fbuilder: FormBuilder,
              private vs: ValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Pancho Soto',
      email: 'test1@gmail.com',
      username: 'Panshibe'
    });
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  submitForm() {
    console.log(this.miFormulario.value);
    
    this.miFormulario.markAllAsTouched();
  }

}
