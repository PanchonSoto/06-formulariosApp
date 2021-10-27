import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

  /* miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl('RTX 4080ti'),
    precio: new FormControl(50000),
    stock: new FormControl(20)
  }); */

  miFormulario: FormGroup = this.fbuilder.group({
    nombre: ['RTX 4080ti', [Validators.required, Validators.minLength(3)] ],
    precio: [0, [Validators.min(5000), Validators.required] ],
    stock: [0, [Validators.min(0), Validators.required] ]
  });

  constructor(private fbuilder: FormBuilder) { }

}
