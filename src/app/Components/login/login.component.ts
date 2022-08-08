import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelos/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuariosService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;
  public token: any;
  public identidad: any;

  constructor(
    private _usuarioService: UsuariosService,
    private _router: Router
  ) {
    this.usuarioModel = new Usuario('', '','','','', '');
  }

  ngOnInit(): void {
  }

  obtenerToken(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      response =>{
        this.token = response.token;
        localStorage.setItem('token', this.token);

        this._router.navigate(['/Dashboard'])
      },
      error => {
        console.log(<any> error);
;      }
    )
  }

  login(){
    this._usuarioService.login(this.usuarioModel).subscribe(
      response => {
        this.identidad = response.userEncontrado;
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.obtenerToken();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error => {
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
}
