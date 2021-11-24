import { Action } from "@ngrx/store";

export const SET_RECIPES = '[Recipes] Set Recipes';

export class SetRecipes implements Action {
    readonly type SET_RECIPES;
}
