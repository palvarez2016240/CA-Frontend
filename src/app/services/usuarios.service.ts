import { Injectable } from '@angular/core';
import { conexion } from './global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../Modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  public token: any;
  public identidad:any;

  constructor(public _http: HttpClient) {
    this.ruta = conexion.url;
  }

  login(usuario: any):Observable<any>{
    let params = JSON.stringify(usuario);
    return this._http.post(this.ruta + 'loginUsuario', params,{headers: this.headersVariable})
  }

  obtenerIdentidad(){
    var indentidad2 = JSON.parse(localStorage.getItem('identidad') || '{}');
    if (indentidad2 != 'undefined'){
      this.identidad = indentidad2;
    }else{
      this.identidad = null;
    }

    return this.identidad;
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

  obtenerUsuarioID(id: String): Observable<any>{
    return this._http.get(this.ruta + '/buscarPublicador/' + id, {headers: this.headersVariable})
  }

  editarUsuario(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + '/editarUsuario/' + usuario._id, params, {headers: headersToken})
  }

  eliminarUsuario(id: String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.delete(this.ruta + 'eliminarUsuario/' + id, {headers: headersToken})
  }

  getUsuarios(): Observable <any>{
    return this._http.get(this.ruta + 'mostrarPublicadores/', {headers: this.headersVariable, });
  }

  createUsuario(user: Usuario): Observable <any>{
    let params = JSON.stringify(user);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.post(this.ruta + "registrarUsuario/", params, {headers: headersToken})
  }

  editarUsuarioADMIN(usuario: Usuario, id: string): Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headersVariable.set('Authorization', this.obtenerToken());
    return this._http.put(this.ruta + '/editarUsuario/' + id, params, {headers: headersToken})
  }

}
