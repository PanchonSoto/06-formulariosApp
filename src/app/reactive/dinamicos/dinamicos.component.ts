import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miForm: FormGroup = this.fbuilder.group({
    nombre: ['',[Validators.required, Validators.minLength(3)] ],
    favoritos: this.fbuilder.array([
      ['Metal Gear'],
      ['Death Stranding']
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.fbuilder.control('',Validators.required);

  get favoritosArr() {
    return this.miForm.get('favoritos') as FormArray;
  }

  constructor(private fbuilder: FormBuilder) { }



  campoNoValido(campo: string) {
    return this.miForm.controls[campo].errors && this.miForm.controls[campo].touched
  }

  agregarFavorito() {
    if(this.nuevoFavorito.invalid) return;

    this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }

  borrar(index: number) {
    this.favoritosArr.removeAt(index);

  }

  guardar(){

    if(this.miForm.invalid){
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);
    this.miForm.reset();
  }
  

}
