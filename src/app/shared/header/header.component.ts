import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormularioService } from 'src/app/services/formulario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public fechaObservable: Observable<Date>;
  private suscripcion : Subscription;

  constructor(public formularioService : FormularioService) {

  }

  ngOnInit(): void {
    this.fechaObservable = this.formularioService.getFechaActual();
    this.suscripcion = this.formularioService.getFechaActual().subscribe(value => { console.log("Corriendo") })
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
