import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Modelos/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicadores',
  templateUrl: './publicadores.component.html',
  styleUrls: ['./publicadores.component.scss'],
  providers: [UsuariosService]
})
export class PublicadoresComponent implements OnInit {
  public publisher: any;
  public modelPublicador: Usuario;
  public listPublicador: Usuario;
  idUsuario: any;

  constructor(
    public _usuarioService: UsuariosService
  ) {
    this.modelPublicador = new Usuario('','','','','','');
    this.listPublicador = new Usuario('','','','','','');
  }

  ngOnInit(): void {
    this.obtenerPublicadores();
  }

  obtenerPublicadores(){
    this._usuarioService.getUsuarios().subscribe(
      response=>{
        this.publisher = response.publicadores;
      }
    )
  }

  crearPoster(){
    this._usuarioService.createUsuario(this.listPublicador).subscribe(
      response =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Publicador creado',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload()
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

  getUsuario(id: String){
    this._usuarioService.obtenerUsuarioID(id).subscribe(
      response =>{
        this.modelPublicador = response.publicadorEncontrado
        this.idUsuario = response.publicadorEncontrado._id
      }
    )
  }

  updateUser(){
    this._usuarioService.editarUsuarioADMIN(this.modelPublicador, this.idUsuario).subscribe(
      response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Publicador editado ',
          showConfirmButton: false,
          timer: 1500,
        });
      this.limpiarVariable();
      window.location.reload()
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }

  limpiarVariable(){
    this.modelPublicador.nombre = "",
    this.modelPublicador.apellido = "",
    this.modelPublicador.usuario = ""
  }

  eliminarUser(){
    this._usuarioService.eliminarUsuario(this.idUsuario).subscribe(
      response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Publicador eliminado',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
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
