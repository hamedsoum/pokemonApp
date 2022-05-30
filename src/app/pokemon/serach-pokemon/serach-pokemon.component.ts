import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-serach-pokemon',
  templateUrl: './serach-pokemon.component.html',
})
export class SerachPokemonComponent implements OnInit {
  
  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router : Router,
    private pokemonService : PokemonService
    ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      //{..."a"."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      //{......"ab"........"ab"...."abc"......}
      distinctUntilChanged(),
    //{......"ab"................"abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
          //{........................."abc"......}

    );
  }

  search(term : string){
    this.searchTerms.next(term);
  }

  goToDetail(pokemon : Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);

  }

}
