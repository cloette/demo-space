import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public images: GalleryItem[];

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.images = [
      new ImageItem({ src: './../../assets/House1.JPG', thumb: './../../assets/House1.JPG' }),
      new ImageItem({ src: './../../assets/house2.JPG', thumb: './../../assets/house2.JPG' }),
      new ImageItem({ src: './../../assets/house3.JPG', thumb: './../../assets/house3.JPG' }),
      new ImageItem({ src: './../../assets/game1.JPG', thumb: './../../assets/game1.JPG' }),
      new ImageItem({ src: './../../assets/editfield.JPG', thumb: './../../assets/editfield.JPG' }),
      new ImageItem({ src: './../../assets/Game2.JPG', thumb: './../../assets/Game2.JPG' })
    ];
  }

}
