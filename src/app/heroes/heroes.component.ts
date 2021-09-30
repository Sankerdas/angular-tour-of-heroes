import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor( private heroService: HeroService, private messageService: MessageService ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  selectedHero?: Hero;

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    )
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return }
    this.heroService.addHero({name} as Hero ) // send name as Hero
    .subscribe( () => this.heroes.push()); // once sucessfully added into ther backed put data into local array
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero); // remove deleted hero from ui
    this.heroService.deleteHero(hero.id).subscribe();
  }


  // BEFORE NAVIGATION CODES

  // onSelect( hero: Hero ): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroComponent: Selected Hero id is = ${hero.id}`)
  // }


}
