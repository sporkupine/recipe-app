import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'All-American Cheeseburger',
      'The Classic Cheeseburger: an American Icon',
      'data:image/jpeg;base64,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',
      [new Ingredient(
          'Beef', 1),
        new Ingredient(
          'Cheese', 1
        ),
        new Ingredient(
          'Buns', 2
        )
      ]
    ),
    new Recipe(
      'Baked Mac and Cheese',
      'Rich, creamy comfort food. What more do you need?',
      'https://www.thechunkychef.com/wp-content/uploads/2018/02/Ultimate-Creamy-Baked-Mac-and-Cheese-baking-dish-680x959.jpg',
      [new Ingredient(
        'Elbow Noodles', 1
      ),
      new Ingredient(
        'Cheddar Cheese', 1
      ),
      new Ingredient(
        'Fontina Cheese', 1
      ),
      new Ingredient(
        'Butter', 1
      )

      ]
    )
  ];

  constructor(private shoppingService: ShoppingService) { }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  AddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
