import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/Modelos/post.model';
import { PostService } from 'src/app/services/post.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  providers: [UsuariosService, PostService]

})
export class PostEditComponent implements OnInit {
  public modelPost: Post;
  public idPost: any;

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuariosService,
    private _router: Router,
    public _PostService: PostService
  ) {
    this.modelPost = new Post('','','','','','','','', false, '', '', false, '');
  }

  ngOnInit(
  ): void {
    this._activatedRoute.paramMap.subscribe((dataRoute)=>{
      this.idPost = dataRoute.get('idPost')})
      this.obtenerPostId(this.idPost);
    }

  obtenerPostId(idPost: any){
    this._PostService.getPostID(idPost).subscribe(
      response => {
        this.modelPost = response.postFound;
        this.idPost = response.postFound._id;
      }
    )
  }

  editarPost(){
    this._PostService.updatePost(this.modelPost, this.idPost).subscribe(
      response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Noticia editada',
          showConfirmButton: false,
          timer: 1500,
        });
      this.limpiarVariable();
      },
      error => {
        console.log(<any>error);
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
    this.modelPost.title = "",
    this.modelPost.description = ""
  }

  cerrarSesion(){
    localStorage.clear()
  }
}
