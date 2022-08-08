import { Injectable } from '@angular/core';
import { conexion } from './global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../Modelos/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public token: any;

  constructor(public _http: HttpClient) {
    this.ruta = conexion.url;
  }

  getPosts(): Observable<any> {
    return this._http.get(this.ruta + 'mostrarPost', {headers: this.headersVariable, });
  }

  getPostID(idPost: String): Observable<any> {
    return this._http.get(this.ruta + 'verPost/' + idPost, {headers: this.headersVariable, });
  }

  getPostAuthor(idAutor: String): Observable<any>{
    return this._http.get(this.ruta + 'autorPost/' + idAutor, {headers: this.headersVariable, });
  }

  createPost(posts: Post): Observable<any>{
    let params = JSON.stringify(posts);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.post(this.ruta + "createPost/", params, {headers: headersToken})
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

  updatePost(posts: Post, post: string): Observable<any>{
    let params = JSON.stringify(posts);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + '/updatePost/' + post, params, {headers: headersToken})
  }

  deletePost(idPost: Post): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.delete(this.ruta + 'deletePost/' + idPost, {headers: headersToken})
  }

  enVivo(): Observable<any> {
    return this._http.get(this.ruta + 'postLive', {headers: this.headersVariable, });
  }
}
