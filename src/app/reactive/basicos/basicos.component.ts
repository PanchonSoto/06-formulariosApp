import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  /* miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl('RTX 4080ti'),
    precio: new FormControl(50000),
    stock: new FormControl(20)
  }); */

  miFormulario: FormGroup = this.fbuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)] ],
    precio: [0, [Validators.min(5000), Validators.required] ],
    stock: [0, [Validators.min(1), Validators.required] ]
  });

  constructor(private fbuilder: FormBuilder) { }

  ngOnInit() {
    this.miFormulario.reset({
      nombre: 'RTX 2080ti',
      precio: 35000,
      stock: 4
    });
  }

  campoNoValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar() {
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
