import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Modelos/usuario.model';
import { PostService } from 'src/app/services/post.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss'],
  providers: [PostService, UsuariosService]
})
export class AutorComponent implements OnInit {
  public publicaciones: any;
  public idAutor: any;
  public modelPublicador: any;

  constructor(
    public _activatedRoute: ActivatedRoute,
    private _postService: PostService,
    private _usuarioService: UsuariosService
  ) {
    this.modelPublicador = new Usuario('','','','','','');
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRoute)=>{
      this.idAutor = dataRoute.get('idAutor')
    })
    this.obtenerPost(this.idAutor),
    this.getUsuario(this.idAutor)
  }

  obtenerPost(idAutor: any){
    this._postService.getPostAuthor(idAutor).subscribe(
      response =>{
        this.publicaciones = response.postFound;
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
      }
    )
  }
}
