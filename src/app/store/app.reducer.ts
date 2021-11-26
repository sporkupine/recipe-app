import * as fromShopping from '../shopping/store/shopping.reducer'
import * as fromAuth from '../auth/store/auth.reducer'
import * as fromRecipes from '../recipes/store/recipe.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  shopping: fromShopping.State,
  auth: fromAuth.State,
  recipes: fromRecipes.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shopping: fromShopping.shoppingReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer
};
