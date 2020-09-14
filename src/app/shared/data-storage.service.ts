import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service'
import { Recipe } from '../recipe.model';
import { map,tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor(private http:HttpClient,private recipeService:RecipeService, private authService:AuthService){}

    storeRecipes(){
        let recipes=this.recipeService.getRecipe();
        return this.http.put('https://foodkart-fb23a.firebaseio.com/recipes.json',recipes)
        .subscribe((recipes)=>{
            console.log(recipes);
        })
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://foodkart-fb23a.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe=>{
                    return {
                        ...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap( recipes => {
                this.recipeService.onFetchRecipe(recipes);
            })
        )
    }

}