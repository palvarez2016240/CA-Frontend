import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuariosService]
})
export class NavbarComponent implements OnInit {
  public identidad: any;

  constructor(
    public _usuarioService: UsuariosService
  ) {
    this.identidad = this._usuarioService.obtenerIdentidad();
  }

  ngOnInit(): void {
    // console.log(this.identidad);
  }

}
