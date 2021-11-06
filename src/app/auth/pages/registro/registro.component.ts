import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator.service';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaiones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fbuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailVal]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  },
    {
      Validators: [this.vs.camposIguales('password', 'passwords2')]
    });

  
  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.required) {
      return 'Email obligatorio';
    } else if(errors?.pattern) {
      return 'Debe ser un formato de correo';
    }else if(errors?.emailtomado) {
      return 'El email ya fue tomado';
    }
    return '';
  }

  constructor(private fbuilder: FormBuilder,
    private vs: ValidatorService,
    private emailVal: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Pancho Soto',
      email: 'test1@test.com',
      username: 'Panshibe',
      password: '123456',
      password2: '123456'
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
