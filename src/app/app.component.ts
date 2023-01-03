import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import { Localidad } from './models/Localidad';
import { Provincia } from './models/Provincia';
import { FormularioService } from './services/formulario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Programacion_Reactiva_Scabuso';
  public nombreControl = new FormControl('', [Validators.required, Validators.maxLength(15)])
  public apellidoControl = new FormControl('', [Validators.required, Validators.maxLength(15)])
  public localidadControl = new FormControl('', [Validators.required])
  public provinciaControl = new FormControl('', [Validators.required])

  public form = new FormGroup({
    nombreControl: this.nombreControl,
    apellidoControl: this.apellidoControl,
    localidadControl: this.nombreControl,
    provinciaControl: this.provinciaControl
  });

  provincias: Observable<Provincia[]>;
  localidades : Localidad[];

  constructor(public formularioService: FormularioService) {}

  ngOnInit(): void {
    this.provincias = this.formularioService.searchProvincia();
    
    this.provinciaControl.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(
      (value) => value && this.formularioService.searchLocalidades(value).subscribe(
        (value) => this.localidades = value
        )
    )
  }
}
