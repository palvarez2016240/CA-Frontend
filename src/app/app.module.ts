import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PublicacionesComponent } from './Components/publicaciones/publicaciones.component';
import { HistoriaComponent } from './Components/historia/historia.component';
import { JuegosComponent } from './Components/juegos/juegos.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PublicadoresComponent } from './Components/publicadores/publicadores.component';
import { AutorComponent } from './Components/autor/autor.component';
import { ComentariosComponent } from './Components/comentarios/comentarios.component';
import { PostPanelComponent } from './Components/post-panel/post-panel.component';
import { PostCreateComponent } from './Components/post-create/post-create.component';
import { PostEditComponent } from './Components/post-edit/post-edit.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { CKEditorModule } from 'ckeditor4-angular';
import { MedioAmbienteComponent } from './Components/medio-ambiente/medio-ambiente.component';
import { SalonesComponent } from './Components/salones/salones.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PublicacionesComponent,
    HistoriaComponent,
    JuegosComponent,
    LoginComponent,
    DashboardComponent,
    PublicadoresComponent,
    AutorComponent,
    ComentariosComponent,
    PostPanelComponent,
    PostCreateComponent,
    PostEditComponent,
    MedioAmbienteComponent,
    SalonesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    YouTubePlayerModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
