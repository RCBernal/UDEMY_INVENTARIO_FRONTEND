import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-modal',
  template: `
    <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow-lg border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">⚠️ Error de Conexión</h5>
          </div>
          <div class="modal-body py-4">
            <p class="mb-0 text-muted">{{ mensaje }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger px-4" (click)="reintentar()">Reintentar</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ErrorModal {
  // Puedes recibir un mensaje personalizado desde el componente padre si lo deseas
  @Input() mensaje: string = 'Hubo un error al cargar los datos del servidor. Verifica que tu backend esté encendido.';

  reintentar() {
    window.location.reload();
  }
}
