import { Injectable } from '@angular/core';

import { Hero } from './hero'; // interface for heroes
import { HEROES } from './mock-heroes'; // mock data

import { Observable, of } from 'rxjs'

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private messageService: MessageService ) { }

  // Get all heroes
  getHeroes(): Observable<Hero[]> {
    const heros = of(HEROES);
    this.messageService.add("HeroService: fetched heroes")
    return heros
  }

  // Get specific hero
  getHero(id: number): Observable<Hero> {
  // For now, assume that a hero with the specified `id` always exists.
  // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(elm => elm.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
