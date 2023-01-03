import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { Localidad } from '../models/Localidad';
import { Provincia } from '../models/Provincia';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = 'https://apis.datos.gob.ar/georef/api/'
  }

  searchProvincia() : Observable<Provincia[]> {
    return this.http.get(this.baseUrl + "provincias", {
      params: {
        campos: 'id,nombre'
      }
    }).pipe(map((value : any) => value.provincias.sort()));
  }

  searchLocalidades(provincia : string) : Observable<Localidad[]> {
    return this.http.get(this.baseUrl + "localidades", {
      params: {
        campos: 'id,nombre',
        provincia: provincia,
        max: '500'
      }
    }).pipe(map((value : any) => value.localidades.sort()));
  }

  public getFechaActual() : Observable<Date>{
    return interval(1000).pipe(map(_ => new Date()));
  }
}
