import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {
  
  constructor(private http: HttpClient){

  }

/**
 * We're using the http.get() method to get the list of pokemons from the server. 
 * 
 * The http.get() method returns an Observable. 
 * 
 * We're using the pipe() method to chain the tap() and catchError() operators. 
 * 
 * The tap() operator is used to log the list of pokemons to the console. 
 * 
 * The catchError() operator is used to catch any error that might occur during the execution of the
 * http.get() method. 
 * 
 * If an error occurs, we're logging the error to the console and returning an empty array. 
 * 
 * The return type of the getPokemonList() method is Observable<Pokemon[]>. 
 * 
 * The getPokemonList() method is used in the PokemonListComponent class. 
 * 
 * Here's the code:
 * @returns An observable of an array of Pokemon objects.
 */
  getPokemonList() : Observable<Pokemon[]> {
     return  this.http.get<Pokemon[]>('api/pokemons').pipe(
        tap((pokemonList)=> console.table(pokemonList)),
        catchError((error) => {
          console.log(error);
          return of([])
        })
      )
  }

 /**
  * We're using the http.get() method to get the pokemon by id, and we're using the pipe() method to
  * tap into the observable stream and log the pokemon, and then we're using the catchError() method to
  * handle any errors that may occur
  * @param {number} pokemonId - number: The id of the pokemon to retrieve.
  * @returns Observable<Pokemon>
  */
  getPokemonById(pokemonId: number): Observable<any> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
   tap((pokemon) => this.log(pokemon),
   catchError((error) => this.handleError(error, [] ))
   )
    );
  }

  searchPokemonList(term : string): Observable<Pokemon[]>{

    if (term.length <= 1) {
      return of([]);
    }

    
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, [] ))
    );
  }
 
/**
 * It sends a PUT request to the server, with the pokemon object as the body of the request, and
 * returns an Observable of null
 * @param {Pokemon} pokemon - Pokemon - the Pokemon object to be updated
 * @returns Observable<null>
 */
  updatePokemon(pokemon : Pokemon) :Observable<null>{
    const httpOptions  = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

 /**
  * It sends a POST request to the server, and returns an Observable of null
  * @param {Pokemon} pokemon - Pokemon - the Pokemon object to be added to the database
  * @returns Observable<null>
  */
  addPokemon(pokemon : Pokemon) : Observable<Pokemon> {
    const httpOptions  = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );  
  }

  /**
   * The log function takes a response object as an argument and logs it to the console
   * @param {any} response - The response from the server.
   */
  private log(response : any){
    console.table(
      response
    )
  }

  /**
   * It takes an error and a value, logs the error, and returns the value
   * @param {Error} error - The error that was thrown
   * @param {any} errorValue - The value to return if an error occurs.
   * @returns Observable<any>
   */
  private handleError(error : Error, errorValue : any){
    console.error(error);
    return of(errorValue)
  }

  getPokemonTypeList(): string[]{    
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ]
  }

  deletePokemonBy(pokemonId : number) : Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }
}
