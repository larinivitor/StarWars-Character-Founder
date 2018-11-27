import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgmaterialModule } from '../ngmaterial.module';

import { SwapiService } from '../swapi.service';
import { BingImageService } from '../bing-image.service';

import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search.component';


@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgmaterialModule
  ],
  declarations: [SearchComponent, DetailComponent],
  providers: [SwapiService, BingImageService]
})
export class SearchModule { }
