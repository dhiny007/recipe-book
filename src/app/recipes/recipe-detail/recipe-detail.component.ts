import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe.model';
import { RecipeService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;

  constructor(private recipeService:RecipeService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params) =>{
        this.id=+params['id'];
        //console.log(this.id);
        this.recipe=this.recipeService.getRecipeDetails(this.id);
      }
    )
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onAddToShoppingList(){
    this.recipeService.onAddIngredientsToShoppingList(this.recipe.ingredients);
    //console.log(this.recipe.ingredients);
  }
}
