import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    startedEdit=new Subject<number>();
    ingredients:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ]

      getIngredients(){
          return this.ingredients.slice();
      }

      getEditableIngredient(index:number){
          //console.log(index);
          return this.ingredients[index];
      }

      addIngredients(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      onAddIngredients(ingredient:Ingredient[]){
          this.ingredients.push(...ingredient);
          console.log(ingredient);
          return this.ingredientsChanged.next(this.ingredients.slice());
      }
      
      onDeleteIngredient(index:number){
          this.ingredients.splice(index,1);
          return this.ingredientsChanged.next(this.ingredients.slice());
      }

      onUpdateIngredient(index:number,newIngredient:Ingredient){
          this.ingredients[index]= newIngredient;
          return this.ingredientsChanged.next(this.ingredients.slice());
      }
}