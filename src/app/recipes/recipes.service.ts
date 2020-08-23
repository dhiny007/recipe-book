import { Recipe } from "../recipe.model";
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipeSelected=new Subject<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Ing1',20),
            new Ingredient('Ing2',10)
        ]),
        new Recipe('Another Test Recipe', 'This is simply another test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
            new Ingredient('Ing1',40),
            new Ingredient('Ing2',100)
        ])
      ];

    constructor(private slService:ShoppingListService){}

    getRecipe(){
        return this.recipes.slice();
    }

    getRecipeDetails(index:number){
        return this.recipes[index];
    }
    
    onAddIngredientsToShoppingList(ingredients:Ingredient[]){
        return this.slService.onAddIngredients(ingredients);
    }
}