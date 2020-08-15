import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef:ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  //@Output() ingredientsAdded= new EventEmitter<Ingredient>();

  constructor(private slService:ShoppingListService) { }

  onAddItem(){
  const ingName=this.nameInputRef.nativeElement.value;
  const ingAmount=this.amountInputRef.nativeElement.value;
  const newIngredient= new Ingredient(ingName,ingAmount);
  // this.ingredientsAdded.emit(newIngredient);
  this.slService.addIngredients(newIngredient);
  }

  ngOnInit(){
  }

}
