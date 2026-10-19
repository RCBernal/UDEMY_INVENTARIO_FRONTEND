import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Producto } from '../models/producto.model';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ErrorModal } from '../error-modal/error-modal';
import { Router } from '@angular/router';

/*
@Component({
  selector: 'app-producto-lista',
  standalone:true,
  imports: [CommonModule],

  templateUrl: './producto-lista.html',
})
export class ProductoLista {
  productos: Producto[] = [];
  private  productoservicio=inject(ProductoServicio)
  private cdr = inject(ChangeDetectorRef); // <-- 1. Inyectamos ChangeDetectorRef


  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos():void{
    this.productoservicio.obtenerProductosLista().subscribe({
      next:(datos)=>{
        this.productos =datos;
        //console.log("Datos asignados a la tabla:", this.productos); // Esto debe imprimir los 50 productos en la consola del navegador (F12)
       this.cdr.detectChanges(); // <-- 2. Forzamos a Angular a redibujar la pantalla
      },
      error:(error)=>console.error("Error al obtener los productos ",error)
    });
  }

}
*/
@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CommonModule, ErrorModal],
  templateUrl: './producto-lista.html',
})
/*
sae esta utilizando un httpResource, el cual es una API de Angular
 para manejar peticiones HTTP directamente utilizando Signals (Señales).
*/
export class ProductoLista {
  private enrutador=inject(Router)
  //private  productoservicio=inject(ProductoServicio)
  // httpResource se conecta automáticamente al endpoint y devuelve una señal (signal)
  private urlBase = 'http://localhost:8080/inventario-app/all';

  productosResource = httpResource<Producto[]>(() => this.urlBase);

  // Puedes acceder directamente a la lista de productos usando: this.productosResource.value()
  /*
 constructor() {
    // 🚩 Bandera moderna con effect para imprimir en consola F12
    effect(() => {
      const datos = this.productosResource.value();
      if (datos) {
        console.log("🚩 Artículos consultados con éxito:", datos);
      }
    });
  }*/

    
  editarProducto(id: number) {
    this.enrutador.navigate(['editar-producto',id])
  }
}
