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

  getHeroes(): Observable<Hero[]> {
    const heros = of(HEROES);
    this.messageService.add("HeroService: fetched heroes")
    return heros
  }
}
