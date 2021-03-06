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


  /*
  ---> ## tap() : it will tap into the flow of observable values and we can use this to send values
  */

  // Get all heroes
  getHeroes(): Observable<Hero[]> {
    // Mock server (similar to http server) response
    // it returns an observable
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')), // ## see tap() function definion on top
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

  // Add hero
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // Delete hero
  deleteHero(id: number) {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
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


  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
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
