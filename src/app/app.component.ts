import { Component, Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES, HEROESJ } from './mock_heros';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <h2>My favorite hero is: {{myHero.name}}</h2>
    
    <p>Heroes:</p>
    <p>Search heroes by keyword :  <input type='text' [(ngModel)]="keyWord"> </p>
   
    
      <li *ngFor = "let hero of heroesJ | filter:keyWord" 
      [class.selected]="hero === selectedHero"
      (click)="onSelect(hero)"> 
          <span class="badge">{{hero.id}}</span> {{hero.name}} 
      </li>   
    
    <p *ngIf="heroes.length > 2">There are many heroes!</p>    

    
  <div *ngIf="selectedHero">

  <h2>{{selectedHero.name | uppercase}} Details</h2>
  <div><span>id: </span>{{selectedHero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="selectedHero.name" placeholder="name">
    </label>
  </div>
  
  
  

</div>
  `
})

@Injectable()

export class AppComponent {
  title: string;
  heroes: Hero[];
  myHero: Hero;
  myObjStr;
  heroesJ = [];
  
  selectedHero: Hero; 

  
  private _url: string = "/assets/mock_heroes.json";
  constructor(private http: HttpClient) {
    this.title = 'Tour of Heroes';
    this.heroes = HEROES;
    this.myHero = new Hero(11, "Green Arrow");
    // this.myObjStr = [ HEROESJ ]
    //         console.log(this.myObjStr)
    this.getData().subscribe(data => this.heroesJ = data);
    console.log(this.heroesJ);
  }
  getData(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this._url);
  }

  updateHeros (): Observable<Hero[]> {
    return this.http.post<Hero[]>(this._url, this.heroesJ, httpOptions);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.updateHeros();
    console.log(this.selectedHero);
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

