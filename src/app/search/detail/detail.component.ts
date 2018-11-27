import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { SwapiService } from '../../swapi.service';
import { BingImageService } from '../../bing-image.service';


@Component({
  selector: 'sm-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  @Input() public characterByInput: any;
  @Output() show = new EventEmitter<Boolean>();


  public images = [];
  public character: any;
  public description = '';
  public homeworld: any;
  public films: any;
  public vehicles: any;
  public startships: any;
  public species: any;
  public image: any;

  constructor(public swapi: SwapiService, public bing: BingImageService) { }

  ngOnInit() {
    this.character = this.characterByInput;
    this.getHomeworld();
    this.getFilms();
    this.getVehicles();
    this.getStarships();
    this.getSpecies();
    this.getImages();
    this.description = `Height: ${this.character.height} Mass: ${this.character.mass}
    Hair color: ${this.character.hair_color} Skin color: ${this.character.skin_color}
    Eye color: ${this.character.eye_color} Birth year: ${this.character.birth_year}
    Gender: ${this.character.gender}`;
  }

  ngOnDestroy() {
    this.homeworld.unsubscribe();
    this.films.unsubscribe();
    this.vehicles.unsubscribe();
    this.startships.unsubscribe();
    this.species.unsubscribe();
    this.image.unsubscribe();
  }

  back() {
    this.show.emit(true);
  }

  getImages() {
    this.image = this.bing.searchImageByName(this.character.name).subscribe(data => {
      this.images = data.value;
    });
  }

  getFilms() {
    this.films = this.swapi.getPropertieDataByArrayUrl(this.characterByInput.films).subscribe(results => {
      this.character.films = results;
    });
  }
  getVehicles() {
    this.vehicles = this.swapi.getPropertieDataByArrayUrl(this.characterByInput.vehicles).subscribe(results => {
      this.character.vehicles = results;
    });
  }
  getStarships() {
    this.startships = this.swapi.getPropertieDataByArrayUrl(this.characterByInput.starships).subscribe(results => {
      this.character.starships = results;
    });
  }
  getSpecies() {
    this.species = this.swapi.getPropertieDataByArrayUrl(this.characterByInput.species).subscribe(results => {
      this.character.species = results;
    });
  }
  getHomeworld() {
    const arrayHome = [this.characterByInput.homeworld];
    this.homeworld = this.swapi.getPropertieDataByArrayUrl(arrayHome).subscribe(results => {
      this.character.homeworld = results;
    });
  }
}
