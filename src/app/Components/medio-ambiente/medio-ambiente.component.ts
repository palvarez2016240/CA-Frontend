import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medio-ambiente',
  templateUrl: './medio-ambiente.component.html',
  styleUrls: ['./medio-ambiente.component.scss']
})
export class MedioAmbienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      const apiLoaded = true;
  }

}
