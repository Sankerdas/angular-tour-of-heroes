import { Injectable } from '@angular/core';

import { Hero } from './hero'; // interface for heroes
import { HEROES } from './mock-heroes'; // mock data

import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    const heros = of(HEROES);
    return heros
  }
}
