import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Service()
export class ProductoServicio {
    private urlBase="http://localhost:8080/inventario-app";
    private clienteHttp=inject(HttpClient);
    
    obtenerProductosLista():Observable<Producto[]>{
        return this.clienteHttp.get<Producto[]>(this.urlBase);
    }

}
