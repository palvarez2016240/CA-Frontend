import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelos/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UsuariosService]
})
export class DashboardComponent implements OnInit {
  userActualizado: any;
  public usuarioIDModel: Usuario;
  public identidad: any;

  constructor(
    public _usuarioService: UsuariosService,
    private _router: Router

  ) {
    this.usuarioIDModel = new Usuario('', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  obtenerUsuarioId(id: String){
    this._usuarioService.obtenerUsuarioID(id).subscribe(
      response => {
        this.usuarioIDModel = response.publicadorEncontrado;
        this.userActualizado = response.publicadorEncontrado;
      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsuario(this.usuarioIDModel).subscribe(
      response => {
        this.identidad = response.usuarioactualizada;
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Perfil editado',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error => {
        console.log(<any>error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  eliminarUser(id: String){
    this._usuarioService.eliminarUsuario(id).subscribe(
      response => {
        this._router.navigate(['/Inicio'])
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Perfil eliminado',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error => {
        console.log(<any>error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  cerrarSesion(){
    localStorage.clear()
  }
}
