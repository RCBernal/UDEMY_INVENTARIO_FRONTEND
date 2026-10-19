import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Producto } from '../models/producto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.html',
})
export class AgregarProducto {
  private router = inject(Router);
  private urlBse = 'http://localhost:8080/inventario-app/save';

  //Instanciamos directo al clase de Producto
  producto = signal<Producto>(new Producto());

  // Estado de carga para deshabilitar el botón mientras guarda
  cargando = signal<boolean>(false);

  // Señal para controlar la alerta de Bootstrap ---> esto mostrara los modales o ventanas popup
  mensajeAlerta = signal<{ texto: string; tipo: 'success' | 'danger' } | null>(null);

  async guardarProducto() {
    this.cargando.set(true);

    try {
      const response = await fetch(this.urlBse, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.producto()),
      });

      if (response.ok) {
        const nombreProd=this.producto().nombre;
        this.mensajeAlerta.set({
          texto: `¡Registro "${nombreProd}" guardado con éxito!`,
          tipo: 'success'
        })
        setTimeout(() => {
          // Redirige al listado tras guardar con éxito
          this.router.navigate(['/productos']);
        }, 5000);
      } 
      else {
        this.mensajeAlerta.set({
          texto: 'Error al guardar el producto.',
          tipo: 'danger'
        });
        this.cargando.set(false);
      }

    } catch (error) {
      console.error('Error en la peticiom : ', error);
      this.mensajeAlerta.set({
        texto: 'Error: No hay conexión con el servidor.',
        tipo: 'danger'
      });
    } finally {
      this.cargando.set(false);
    }
  }

  volver() {
  this.router.navigate(['/productos']);
}
}
