import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Comment } from 'src/app/Modelos/comments.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
  providers: [UsuariosService, CommentService]

})
export class ComentariosComponent implements OnInit {
  public modelComments: Comment;
  public comentarios: any;
  public idComment: any;
  public nameComment: any;

  constructor(
    private _CommentService: CommentService,
    public _usuarioService: UsuariosService

  ) {
    this.modelComments = new Comment('', '', '', '', false);
  }

  ngOnInit(): void {
    this.allComentarios()
  }

  allComentarios(){
    this._CommentService.allComent().subscribe(
      response => {
        this.comentarios = response.comentFound;
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

  getComment(idComment: String){
    this._CommentService.getCommentID(idComment).subscribe(
      response=>{
        this.idComment = response.commentFound._id;
        this.nameComment = response.commentFound.comment;
      }
    )
  }

  removeCommment(){
    this._CommentService.deleteComment(this.idComment).subscribe(
      response => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Comentario eliminado',
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
