import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import * as ShoppingActions from '../store/shopping.actions';
import * as fromShopping from '../store/shopping.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingService: ShoppingService,
    private store: Store<fromShopping.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingService.updateIngredient(
      //   this.editedItemIndex,
      //   newIngredient
      // );
      this.store.dispatch(
        new ShoppingActions.UpdateIngredient({
          index: this.editedItemIndex,
          ingredient: newIngredient,
        })
      );
    } else {
      // this.shoppingService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onDelete(ingredient: Ingredient) {
    // this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingActions.DeleteIngredient(this.editedItemIndex)
    );
    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
