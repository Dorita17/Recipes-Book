import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, take, tap, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
 private apiEndpoit = 'https://recipes-project-f859c.firebaseio.com/recipes.json';

 constructor(private http: HttpClient, private recipeServices: RecipeService, private authService: AuthService) {}

 storeRecipes() {
  const recipes = this.recipeServices.getRecipes();
  this.http.put(this.apiEndpoit, recipes).subscribe(response => {
    console.log(response);
  });
 }

//  fetchRecipes() {
//    return this.authService.user.pipe(take(1), exhaustMap(user => {
//     return this.http.get<Recipe[]>(this.apiEndpoit,
//       {
//         params: new HttpParams().set('auth', user.token)
//       });
//    }),
//    map(recipes => {
//     return recipes.map(recipe => {
//       return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
//     });
//   }),
//    tap(recipes => {
//      this.recipeServices.setRecipes(recipes);
//    }));
//  }

fetchRecipes() {
   return this.http.get<Recipe[]>(this.apiEndpoit).pipe(
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
     tap(recipes => {
       this.recipeServices.setRecipes(recipes);
     })
   );
  }
}
