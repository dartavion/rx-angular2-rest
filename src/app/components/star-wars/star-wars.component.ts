import { Component, OnInit } from '@angular/core';
import {StarWarsService} from "../../services/star-wars.service";
import {Character} from "../../objects/character";


@Component({
  selector: 'app-star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.css'],
  providers: [StarWarsService]
})
export class StarWarsComponent implements OnInit {
  characters: Character[];
  images = {image: 'http://static.srcdn.com/slir/w538-h800-q90-c538:800/wp-content/uploads/Star-Wars-Logo-News.jpg'};

  constructor(private sw:StarWarsService) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.sw
      .getLightSideCharacters()
      .subscribe(characters => this.characters = characters);
  }

  handleClick(payload: string) {
    this.sw.getImages(payload)
      .subscribe(images => {
        this.images = images;
        console.log('images: ',images);
      });
  }

}
