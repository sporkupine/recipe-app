import { Ingredient } from "../shared/ingredient.model"

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ]

}

export function shoppingReducer(state = initialState, action) {

}
