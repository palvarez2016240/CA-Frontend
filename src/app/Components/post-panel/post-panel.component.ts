import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Modelos/post.model';
import { PostService } from 'src/app/services/post.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-panel',
  templateUrl: './post-panel.component.html',
  styleUrls: ['./post-panel.component.scss'],
  providers: [UsuariosService, PostService]
})
export class PostPanelComponent implements OnInit {
  public publicaciones: any;
  public modelPost: Post;
  public idPost: any;

  constructor(
    public _usuarioService: UsuariosService,
    private _postService: PostService,
  ) {
    this.modelPost = new Post('','','','','','','','', false, '', '', false, '');
  }

  ngOnInit(): void {
    if (this._usuarioService.obtenerIdentidad().rol == 'ROL_Publicador') {
      this.obtenerPost(this._usuarioService.obtenerIdentidad()._id)
    }else{
      this.obtenerPosts();
    }

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

  obtenerPostId(idPost: any){
    this._postService.getPostID(idPost).subscribe(
      response => {
        this.modelPost = response.postFound;
        this.idPost = response.postFound._id;
      }
    )
  }

  eliminarPost(){
    this._postService.deletePost(this.idPost).subscribe(
      response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Publicacion eliminada',
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

  obtenerPosts(){
    this._postService.getPosts().subscribe(
      response=>{
        this.publicaciones = response.postFound;
      }
    )
  }

  cerrarSesion(){
    localStorage.clear()
  }
}
