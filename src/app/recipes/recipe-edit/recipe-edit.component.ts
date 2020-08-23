import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode=false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id'] != null;
        //console.log(this.editMode);
        this.initForm();
      }
    )
  }

  get getControls(){
    //console.log('in');
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(),
        'amount':new FormControl()
    })
    )
  }

  onSubmit(){
    console.log(this.recipeForm);
    //console.log(this.getControls());
    //this.getControls();
  }

  initForm(){
    let recipeName="";
    let recipeDescription="";
    let imagePath="";
    let recipeIngredients=new FormArray([]);

    if(this.editMode){
      let recipe=this.recipeService.getRecipeDetails(this.id);
      recipeName=recipe.name;
      recipeDescription=recipe.description;
      imagePath=recipe.imagePath;
      if(recipe["ingredients"]){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name),
              'amount':new FormControl(ingredient.amount)
            })
          )
        }
        console.log(recipeIngredients);
      }
    }
    
    this.recipeForm=new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(recipeDescription),
      'ingredients':recipeIngredients
    })
  }
}
