import { Injectable } from '@angular/core';
import { conexion } from './global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../Modelos/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public token: any;

  constructor(public _http: HttpClient) {
    this.ruta = conexion.url;
   }

   obtenerToken(){
    var token2 = localStorage.getItem('token');
    if (token2 != 'undefined') {
      this.token = token2;
    }else{
      this.token = null;
    }

    return this.token;
  }

   getComment(idPost: String): Observable<any>{
    return this._http.get(this.ruta + 'commentPost/' + idPost, {headers: this.headersVariable, });
   }

   comentar(comentario: Comment, idPost: String): Observable<any>{
    let params = JSON.stringify(comentario);
    return this._http.post(this.ruta + "createComment/" + idPost, params, {headers: this.headersVariable});
   }

   allComent():Observable <any>{
    return this._http.get(this.ruta + 'comentarios/', {headers: this.headersVariable, });

   }

   deleteComment(idComment: String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.delete(this.ruta + 'deleteComment/' + idComment, {headers: headersToken})
   }

   getCommentID(idComment: String): Observable<any>{
    return this._http.get(this.ruta + 'readComment/' + idComment, {headers: this.headersVariable})
   }
}
