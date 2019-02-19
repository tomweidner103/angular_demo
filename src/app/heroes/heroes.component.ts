import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
import { HeroService } from '../hero.service';

//always imported from @angular/core
@Component({
  //src/     app-heroes
  selector: 'app-heroes',
  //template html
  templateUrl: './heroes.component.html',
  //private css
  styleUrls: ['./heroes.component.css']
})
  //always export to use elsewhere if needed
export class HeroesComponent implements OnInit {
  //these are properties
  heroes: Hero[];
  constructor(private heroService: HeroService) { }

  //lifecycle hook (component did mount)
  ngOnInit() {
    this.getHeroes();
  }
  //on <li> element in html. finds Hero component and will display each onem selcting this hero

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}

