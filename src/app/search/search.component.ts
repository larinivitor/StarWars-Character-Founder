import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';


@Component({
  selector: 'sm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchField: FormControl;
  public searchResults = [];
  public showSearch = true;
  public character: any;
  public pending = false;
  public valueChanges: any;

  constructor(public swapi: SwapiService) {
    this.searchField = new FormControl();
    this.formChange();
  }

  ngOnInit() {
  }

  formChange() {
    this.valueChanges = this.searchField.valueChanges.pipe(debounceTime(400)).subscribe(data => {
      this.pending = true;
      this.swapi.peopleSearch(data).subscribe(response => {
        this.searchResults = response.results;
      }, error => {

      }, () => {
        this.pending = false;
      });
    });
  }

  changeSearch(event) {
    this.showSearch = event;
    this.searchField = new FormControl();
    this.formChange();
  }

  getCharacter(event) {
    this.character = event.option.value;
    this.valueChanges.unsubscribe();
    this.showSearch = false;
  }

  displayFn(val: any) {
    return val ? val.name : val;
  }

}
