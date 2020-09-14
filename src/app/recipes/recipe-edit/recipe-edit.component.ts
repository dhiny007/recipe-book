import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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

  constructor(private route:ActivatedRoute, private recipeService:RecipeService,private router:Router) { }

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
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)]
          )
    })
    )
  }

  onDeleteIngredient(index){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit(){
    console.log(this.recipeForm);
    //console.log(this.getControls());
    //this.getControls();
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
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
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
        console.log(recipeIngredients);
      }
    }
    
    this.recipeForm=new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(imagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    })
  }
}
