import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterModule, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  styles: [`
    .barra {
      position: sticky;
      top: 0;
      z-index: 10;
      background: rgba(15, 17, 21, .8);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, .08);
    }
    .barra-interior {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: .5rem;
      padding-top: .75rem;
      padding-bottom: .75rem;
    }
    .marca {
      display: flex;
      align-items: center;
      gap: .6rem;
      color: #fff;
      font-weight: 600;
      font-size: 1.05rem;
      text-decoration: none;
    }
    .marca i {
      font-size: 1.4rem;
      color: #a78bfa;
    }
    .enlaces {
      display: flex;
      flex-wrap: wrap;
      gap: .25rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .enlaces a {
      display: flex;
      align-items: center;
      gap: .45rem;
      padding: .5rem .9rem;
      border-radius: .6rem;
      color: #9ca3af;
      text-decoration: none;
      font-size: .95rem;
      transition: background .2s, color .2s;
    }
    .enlaces a:hover {
      color: #fff;
      background: rgba(255, 255, 255, .06);
    }
    .enlaces a.activo {
      color: #fff;
      background: rgba(111, 66, 193, .3);
    }
  `],
})
export class App {
  protected readonly title = signal('inventario-app');
}
