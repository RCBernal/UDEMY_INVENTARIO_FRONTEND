import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Producto } from '../models/producto.model';
import { ErrorModal } from '../error-modal/error-modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, ErrorModal],
  templateUrl: './producto-lista.html',
  styles: [
    `
      .tabla-card {
        background: #13161c;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      }
      .tabla {
        width: 100%;
        border-collapse: collapse;
      }
      .tabla th {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #9ca3af;
        background: rgba(255, 255, 255, 0.04);
        padding: 1rem 0.75rem;
        text-align: left;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .tabla td {
        padding: 0.9rem 0.75rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        vertical-align: middle;
      }
      .tabla tbody tr:last-child td {
        border-bottom: none;
      }
      .tabla tbody tr:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      .tabla .der {
        text-align: right;
      }
      .tabla .centro {
        text-align: center;
      }
      .tabla .primero {
        padding-left: 1.5rem;
      }
      .tabla .ultimo {
        padding-right: 1.5rem;
      }
      .tabla .tenue {
        color: #9ca3af;
      }

      .badge-stock {
        display: inline-block;
        min-width: 2.4rem;
        padding: 0.2rem 0.7rem;
        border-radius: 999px;
        font-size: 0.8rem;
        font-weight: 600;
        text-align: center;
      }
      .stock-ok {
        background: rgba(25, 135, 84, 0.22);
        color: #75d9a3;
      }
      .stock-medio {
        background: rgba(255, 193, 7, 0.18);
        color: #ffd66b;
      }
      .stock-bajo {
        background: rgba(220, 53, 69, 0.22);
        color: #ff8a94;
      }

      .btn-icon {
        width: 34px;
        height: 34px;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.6rem;
      }
    `,
  ],
})
export class ProductoLista {
  private enrutador = inject(Router);
  private urlBase = 'http://localhost:8080/inventario-app';
  constructor(private clienteHttp: HttpClient) {}

  productosResource = httpResource<Producto[]>(() => `${this.urlBase}/all`);

  filtro = signal('');

  productosFiltrados = computed(() => {
    const f = this.filtro().toLowerCase().trim();
    const lista = this.productosResource.value() ?? [];

    return lista.filter(
      (p) => p.nombre.toLowerCase().includes(f) || (p.descripcion ?? '').toLowerCase().includes(f),
    );
  });

  claseStock(stock: number): string {
    if (stock < 10) return 'stock-bajo';
    if (stock < 25) return 'stock-medio';
    return 'stock-ok';
  }

  editarProducto(id: number) {
    this.enrutador.navigate(['editar-producto', id]);
  }

  eliminarProducto(id: number) {
    if (confirm('Estas seguro de eliminar el producto?')) {
      this.clienteHttp.delete(`${this.urlBase}/${'delete'}/${id}`).subscribe({
        next: () => {
          this.productosResource.reload();
        },
        error: (err) => console.error('Error al eliminar', err),
      });
    }
  }
}
