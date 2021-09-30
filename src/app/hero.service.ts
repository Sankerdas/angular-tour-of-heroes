import { Injectable } from '@angular/core';

import { Hero } from './hero'; // interface for heroes
import { HEROES } from './mock-heroes'; // mock data

import { Observable, of } from 'rxjs'

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private http: HttpClient, private messageService: MessageService ) { }

  private heroesUrl = 'api/heroes'; // InMemoryData plugin format format : base/:collectionName

  // Get all heroes
  getHeroes(): Observable<Hero[]> {
    // Mock server (similar to http server) response
    // it returns an observable
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')), // WHAT is tap ??? I dont't know, FIND IT
      catchError(this.handleError<Hero[]>('getHeroes', []))
    ) // pipe used for observables error handling
  }

  // Get specific hero
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Update Hero
  updateHero(hero: Hero) {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  /* OLD CODES
    Mock data */

  // // get all heroes
  // getHeroes(): Observable<Hero[]> {
  //   const heros = of(HEROES);
  //   this.messageService.add("HeroService: fetched heroes")

  // }


    // // Get specific hero
    // getHero(id: number): Observable<Hero> {
    //   const hero = HEROES.find(elm => elm.id === id)!;
    //   this.messageService.add(`HeroService: fetched hero id=${id}`);
    //   return of(hero);
    // }

}
