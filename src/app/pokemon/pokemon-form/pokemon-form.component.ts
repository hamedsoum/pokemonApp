import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls : [
    './pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon : Pokemon;
  types: string[];
  isAddForm : boolean;

  constructor(private pokemonService : PokemonService,
    private router : Router ) { }

  ngOnInit(): void {
      this.types = this.pokemonService.getPokemonTypeList();
      this.isAddForm = this.router.url.includes('add');
  }

 /**
  * The function hasType() takes a string as an argument and returns a boolean
  * @param {string} type - string - This is the type that we want to check if the Pokemon has.
  * @returns a boolean value.
  */
  hasType(type : string) : boolean{
    return this.pokemon.types.includes(type);

  }

  selectType($event: Event, type: string){
    const isCheked = ($event.target as HTMLInputElement).checked;

    if (isCheked) {
      this.pokemon.types.push(type);
    }else{
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string):boolean{

    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }
    return true;
  }
  onSubmit(){
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
      .subscribe((pokemon : Pokemon) => this.router.navigate(['/pokemon', pokemon.id]));
    } else {
      this.pokemonService.updatePokemon(this.pokemon)
      .subscribe(() =>  this.router.navigate(['/pokemon', this.pokemon.id]));
    }
   
    //  this.router.navigate(['/pokemon', this.pokemon.id])
  }
}
