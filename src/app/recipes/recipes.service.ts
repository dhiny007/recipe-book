import { Recipe } from "../recipe.model";
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
    recipeChanged= new Subject<Recipe[]>();
    //recipeSelected=new Subject<Recipe>();
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //     [
    //         new Ingredient('Ing1',20),
    //         new Ingredient('Ing2',10)
    //     ]),
    //     new Recipe('Another Test Recipe', 'This is simply another test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //     [
    //         new Ingredient('Ing1',40),
    //         new Ingredient('Ing2',100)
    //     ])
    //   ];

    private recipes:Recipe[]=[];

    constructor(private slService:ShoppingListService){}

    getRecipe(){
        return this.recipes.slice();
    }

    getRecipeDetails(index:number){
        return this.recipes[index];
    }

    onFetchRecipe(recipe:Recipe[]){
        this.recipes=recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
    
    onAddIngredientsToShoppingList(ingredients:Ingredient[]){
        return this.slService.onAddIngredients(ingredients);
    }
}