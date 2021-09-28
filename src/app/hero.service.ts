import { Injectable } from '@angular/core';
import { Hero } from './hero'; // interface for heroes
import { HEROES } from './mock-heroes'; // mock data

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Hero[] {
    return HEROES;
  }
}
