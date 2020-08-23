import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f', { static: false }) slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  //@Output() ingredientsAdded= new EventEmitter<Ingredient>();

  constructor(private slService:ShoppingListService) { }

  ngOnInit(){
    //console.log('Hello');
    this.subscription=this.slService.startedEdit.subscribe(
      (index:number)=>{
        //console.log('hello');
        //console.log(index);
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.slService.getEditableIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }

  onModifyItem(form:NgForm){
    const value=form.value;
    console.log(value);
    const newIngredient= new Ingredient(value.name,value.amount);
    if(this.editMode)
      {
        this.slService.onUpdateIngredient(this.editedItemIndex,newIngredient);    
      }
    else
      {
        this.slService.addIngredients(newIngredient);
      }
    this.editMode=false;
    form.reset();
    }

    onClear(){
      this.slForm.reset();
      this.editMode=false;
    }

    onDelete(){
      this.slService.onDeleteIngredient(this.editedItemIndex);
      this.onClear();
    }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
