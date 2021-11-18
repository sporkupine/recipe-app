import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

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
    private shoppingService: ShoppingService,
    private loggingService: LoggingService,
    private store: Store<{shopping: {ingredients: Ingredient[]}}>,
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
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // this.ingChangeSub.unsubscribe();
  }
}
