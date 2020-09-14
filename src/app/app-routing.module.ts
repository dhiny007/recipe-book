import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuardService } from './authentication/auth.guard'

const routes: Routes = [
   { path:'', redirectTo: '/recipes', pathMatch:'full'},
   { path:'recipes', component:RecipesComponent,canActivate:[AuthGuardService], children:[
     { path:'', component:RecipeStartComponent},
     { path:'new',component:RecipeEditComponent},
     { path:':id',component:RecipeDetailComponent, resolve:[RecipeResolverService]},
     { path:':id/edit',component:RecipeEditComponent, resolve:[RecipeResolverService]}
   ]},
   { path:'shoppingList', component:ShoppingListComponent},
   { path:'auth', component:AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
