import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Ingredient} from '../../model/ingredient';
import {Recipe} from '../../model/recipe';
import {ToastService} from '../../common/toast/toast.service';
import {ToastMessage} from '../../model/toast-message';
import {ErrorMessagesService} from '../../common/error-messages-service';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm = new FormGroup({
    imagePath: new FormControl('https://via.placeholder.com/280', Validators.required),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(20)]),
    ingredients: new FormArray([], Validators.required)
  });

  isEditingRecipe = false;
  editingRecipeId: number;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
              private router: Router, private toastService: ToastService, private errorMessageService: ErrorMessagesService) {
  }

  ngOnInit() {
    if (this.route.toString().includes('edit')) {
      this.isEditingRecipe = true;
      this.route.params.subscribe((params: Params) => {
        const recipe = this.recipeService.getRecipeById(+params['id']);
        this.recipeForm.setValue({
          imagePath: recipe.imagePath,
          name: recipe.name,
          description: recipe.description,
          ingredients: []
        });
        this.editingRecipeId = recipe.id;
        this.populateValueForIngredients(recipe.ingredients);
      });
    }
  }

  private populateValueForIngredients(ingredients: Ingredient[]) {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    for (const ingredient of ingredients) {
      ingredientsArray.push(new FormGroup({
        name: new FormControl(ingredient.name),
        amount: new FormControl(ingredient.amount),
        unit: new FormControl(ingredient.unit)
      }));
    }
  }

  deleteIngredientFromRecipe(ingredient: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(ingredient);
  }

  saveRecipe() {
    const recipe: Recipe = this.recipeForm.value;
    if (this.isEditingRecipe) {
      recipe.id = this.editingRecipeId;
    } else {
      recipe.id = this.recipeService.getAllRecipes().length + 1;
    }
    if (this.isEditingRecipe) {
      this.recipeService.replaceRecipe(recipe);
      this.toastService.publishMessage(new ToastMessage('Edit Recipe', 'Recipe Edited Successfully', 'lightpink'));
      this.router.navigate(['recipes', this.editingRecipeId]);
    } else {
      this.recipeService.addNewRecipe(recipe);
      this.toastService.publishMessage(new ToastMessage('New Recipe', 'New Recipe Created', 'lightgreen'));
      this.router.navigate(['recipes']);
    }
  }

  addNewIngredient() {
    const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientsArray.push(new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      unit: new FormControl('unit', Validators.required)
    }));
  }

  getErrorMessage(fieldName: string, errors: ValidationErrors) {
    return this.errorMessageService.getErrorMessage(fieldName, Object.keys(errors)[0]);
  }
}
