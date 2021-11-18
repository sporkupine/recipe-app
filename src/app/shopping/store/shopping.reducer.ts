import { Action } from "@ngrx/store"
import { Ingredient } from "../../shared/ingredient.model"
import * as ShoppingActions from "./shopping.actions";

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ]

}

export function shoppingReducer(state = initialState, action: ShoppingActions.AddIngredient) {
  switch(action.type) {
    case ShoppingActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
  }
}
