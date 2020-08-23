import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  //@Output() recipeWasSelected=new EventEmitter<Recipe>();
  recipes: Recipe[];

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
  //   console.log(this.recipeWasSelected);
  // }
  constructor(private recipeService:RecipeService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipes=this.recipeService.getRecipe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
