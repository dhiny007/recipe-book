import { Component, OnInit,Input} from '@angular/core';
import { Recipe } from 'src/app/recipe.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 // @Output() recipeSelected=new EventEmitter<void>();
  @Input() recipe:Recipe;
  @Input() index;
  

  ngOnInit(): void {
  }

}
