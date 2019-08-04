import {Component, OnInit, ViewChild} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {NgForm, ValidationErrors} from '@angular/forms';
import {ErrorMessagesService} from '../../common/error-messages-service';

@Component({
  selector: 'rb-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('shoppingForm', {static: true}) shoppingForm: NgForm;

  constructor(private shoppingCartService: ShoppingCartService, private errorMessageService: ErrorMessagesService) {
  }

  ngOnInit() {
    setTimeout(() => this.shoppingForm.setValue({
      name: '',
      amount: 0,
      unit: 'unit'
    }), 500);
  }

  onIngredientAdd() {
    console.log(this.shoppingForm.value);
    this.shoppingCartService.addIngredient(this.shoppingForm.value);
    this.shoppingForm.resetForm({
      name: '',
      amount: 0,
      unit: 'unit'
    });
    /*this.ingredient = new Ingredient('', 0, null);*/
  }

  onClearCart() {
    this.shoppingCartService.clearCart();
  }

  getErrorMessage(fieldName: string, errors: ValidationErrors) {
    return this.errorMessageService.getErrorMessage(fieldName, Object.keys(errors)[0]);
  }
}
