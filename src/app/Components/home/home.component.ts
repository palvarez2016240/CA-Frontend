import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Modelos/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  public publicaciones: any;
  public vivoList: any;
  public modelPost: Post;
  public imagen: any;

  constructor(
    private _PostService: PostService
  ) {
    this.modelPost = new Post('','','','','','','','', false, '', '', false, '');
  }

  ngOnInit(): void {
    this.obtenerPost();
    this.obtenerPostLive();
  }

  obtenerPost(){
    this._PostService.getPosts().subscribe(
      response=>{
        this.publicaciones = response.postFound;
      }
    )
  }

  obtenerPostLive(){
    this._PostService.enVivo().subscribe(
      response=>{
        this.vivoList = response.postFound;
      }
    )
  }


}
