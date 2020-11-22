import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  //@Output() recipeWasSelected=new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription:Subscription;

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
  //   console.log(this.recipeWasSelected);
  // }
  constructor(private datastorageService:DataStorageService,private recipeService:RecipeService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.datastorageService.fetchRecipes().subscribe();
    this.recipes=this.recipeService.getRecipe();
    this.subscription=this.recipeService.recipeChanged.subscribe(
      (recipe:Recipe[]) =>{
        this.recipes=recipe;
      }
    )
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
