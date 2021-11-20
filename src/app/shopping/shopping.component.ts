import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import * as fromShopping from './store/shopping.reducer'
import * as ShoppingActions from './store/shopping.actions'
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  providers: [],
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private ingChangeSub: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromShopping.AppState>,
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select('shopping');

    // this.ingredients = this.shoppingService.getIngredients();
    // this.ingChangeSub = this.shoppingService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    // this.loggingService.printLog('Hi from the ShoppingComponent NgOnInit!');
  }

  onEditItem(index: number) {
    // this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.ingChangeSub.unsubscribe();
  }
}
