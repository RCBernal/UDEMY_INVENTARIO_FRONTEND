import { httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule ],
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.html',
})
export class EditarProducto {
  private ruta = inject(ActivatedRoute);
  private router=inject(Router);

  //Obtenemos el ID de la ruta de forma segura
  private id = this.ruta.snapshot.params['id'];

  //URL base del backend
  private urlBase = 'http://localhost:8080/inventario-app';

  productosIdResource = httpResource<Producto>(() => `${this.urlBase}/${'search'}/${this.id}`);

  cargando=signal<boolean>(false);

  //Metodo de actualizacion 
  async guardarProducto(){
    this.cargando.set(true)

    //obtenemos el producto actual que ya tiene los datos 
    const productoModificado=this.productosIdResource.value();
    if(!productoModificado)return;
    try{
      // Petición PUT hacia tu backend (similar al concepto con fetch o HttpClient)
      const response =await fetch (`${this.urlBase}/${"update"}/${this.id}`,{
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productoModificado)
      });

      if(response.ok){
        //Redirigimos al listado de productos
        this.router.navigate(['/productos']);
      }else{
        console.error('Errot al actualizar el producto');
        this.cargando.set(false);
      }
    }catch(error){
      console.error('error de red',error);
      this.cargando.set(false);
    }
  }

}
