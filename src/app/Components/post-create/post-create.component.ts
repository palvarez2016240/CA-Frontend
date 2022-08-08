import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/Modelos/post.model';
import { PostService } from 'src/app/services/post.service';
import { UsuariosService } from 'src/app/services/usuarios.service'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
  providers: [UsuariosService, PostService]
})
export class PostCreateComponent implements OnInit {
  public modelPost: Post;

  constructor(
    public _usuarioService: UsuariosService,
    private _router: Router,
    public _postService: PostService

  ) {
    this.modelPost = new Post('','','','','','','','', false, '', '', false, '');
  }

  ngOnInit(): void {
  }

  crearPost(){
    this._postService.createPost(this.modelPost).subscribe(
      response =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Noticia publicada',
          showConfirmButton: false,
          timer: 1500
        })
        this._router.navigate(['/PanelNoticias']);
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
