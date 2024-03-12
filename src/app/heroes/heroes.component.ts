import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../_services/hero.service';
import { MessageService } from '../_services/message.service';
import { nextTick } from 'process';
import { error } from 'console';
import { response } from 'express';

@Component({
  // standalone: true,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent {
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
  selectedHero?: Hero;
  heroes: Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe({
      next: (response) => (this.heroes = response),
      error: (error) => console.log(error),
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`You selected hero : ${hero.name} with the id of ${hero.id}`);
    console.log(this.selectedHero);
  }
}
