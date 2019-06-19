# Course Project (Recipe Book and Shopping list)

In this project we will use almost all learning. The project is a recipe book which contains
recipes and list of ingredients used in recipes, we can add individual ingredient to shopping cart or we
can add all of ingredients in a recipe on shopping cart.

## Planning App

Planning app i.e. we are designing and fitting the app components together. This section will get update
throughout the course, We will add and remove some of content on this section as we go ahead. 

  1. We start with thinking feature and component. For this recipe book we have initially two main features
      * Recipe
      * Shopping list
      
  2. Almost all of the application have some common component like
      * Root component which hold our other components.
      * Header component which contains the login, menu and brand information.
      
  3.  Now we have our feature and common components, now we have to think what are component that may be needed
  by our features.
      * For Our Recipe book we may need below components
        * Recipe List
        * Recipe Items (Ingredient)
        * Recipe Details
      * For Our Shopping list we may need below components
        * Shopping list component
        * Shopping list container or edit list
  
  4. We need models to represent each of feature details which hold or pass the data to each other components
      * Recipe Models
        * Ingredient
        * Recipe
      * Shopping List Models
        * Ingredient
        
## Implementation details
While implementing this course project, we will learn a lot but that may require some addition and deletion of code
after each chapter. I will update files in course project and keep an entry in this file that what is replaced with new code.
Now with this let's begin:

  1. First we create application using below command
      ```
          ng new CourseProject
      ```
  2. Installing the bootstrap using NPM and adding to project in angular.json.
      ```
        npm install --save bootstrap
      ```
  3. Now cleaned up the app component change with rb as prefix and change the initialize module as did in chapter 1 and change the
  root component.
  4. Now As discussed in point no.3 , we will create component for our recipe book. So we have created below components.
      * [common/header/header.component.ts](src/app/common/header/header.component.ts)
      * [recipe/recipe-details/recipe-details.component.ts](src/app/recipe/recipe-details/recipe-details.component.ts)
      * [recipe/recipe-list/recipe-list.component.ts](src/app/recipe/recipe-list/recipe-list.component.ts)
      * [recipe/recipe-list/recipe-list-item/recipe-list-item.component.ts](src/app/recipe/recipe-list/recipe-list-item/recipe-list-item.component.ts)
      * [recipe/recipe-view-container/recipe-view-container.component.ts](src/app/recipe/recipe-view-container/recipe-view-container.component.ts)
      * [cart/shopping-list/shopping-list.component.ts](src/app/cart/shopping-list/shopping-list.component.ts)
      * [cart/shopping-edit/shopping-edit.component.ts](src/app/cart/shopping-edit/shopping-edit.component.ts)
  5. We created header in HTML and then we are going to create models for our application which holds the data and build
  some display using BootStrap 4.
  
## After Chapter 2 Completion
We have learn data binding and event binding, now we are going to use that to enable navigation, display recipe view 
and allow user to add ingredient in shopping list.

### Navigation
The navigation we are building right now is not optimized solution, we will change as we move ahead through course. But 
for now to enable the menu items we are going to use ngIf and event binding. For this we will emit an event whenever a menu
clicked catch it in root component and store in variable and compare the variable value in ngIf.

[header.component.html](/src/app/common/header/header.component.html)
```angular2html
 <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#" (click)="onSelect('recipe')">Recipe</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" (click)="onSelect('shoppingList')">Shopping List</a>
      </li>
 </ul>
```
[header.component.ts](/src/app/common/header/header.component.ts)
```angular2
 @Output() menuClicked: EventEmitter<string> = new EventEmitter();

onSelect(menuItem: string) {
    this.menuClicked.emit(menuItem);
  }
```
[recipe-book-root.component.html](/src/app/recipe-book-root.component.html)
```angular2html
<rb-header (menuClicked)="changeMenu($event)"></rb-header>
<br/>
<div class="container">
  <div class="row">
    <div class="col-12">
      <rb-recipe-view-container *ngIf="selectedMenuItem === 'recipe'"></rb-recipe-view-container>
      <rb-shopping-list *ngIf="selectedMenuItem === 'shoppingList'"></rb-shopping-list>
    </div>
  </div>
</div>
```
[recipe-book-root.component.ts](/src/app/recipe-book-root.component.ts)
```angular2
 selectedMenuItem = 'recipe';

  changeMenu(menuName: string) {
    this.selectedMenuItem = menuName;
  }
```

### Recipe Details
Now we are going to use event binding to show the details of selected recipe. Before this we have done some refactoring,
Which is for recipe list. We are going to pass each recipe to recipe list item which creates the list time and render
left side list each item. To enable the recipe details on selection we will transmit an event on list item click event, 
which is captured by recipe-list-item and then we capture this event and then transmit a event to parent component which
is view container for our recipe view and this view container takes this event emitted value and pass that to recipe detail
using property binding, which will show details of selected recipe.

[recipe-list-item.component.html](src/app/recipe/recipe-list/recipe-list-item/recipe-list-item.component.html)
```angular2html
<a href="#" class="list-group-item list-group-item-action
       d-flex justify-content-between align-items-center" (click)="selectRecipe(recipe)">
```
[recipe-list-item.component.ts](src/app/recipe/recipe-list/recipe-list-item/recipe-list-item.component.ts)
```angular2
  @Input() recipe: Recipe;
  @Output() recipeToDisplay: EventEmitter<Recipe> = new EventEmitter();
   selectRecipe(recipe: Recipe) {
        this.recipeToDisplay.emit(recipe);
    }
```
[recipe-list.component.html](src/app/recipe/recipe-list/recipe-list.component.html)
```angular2html
 <rb-recipe-list-item *ngFor="let recipe of recipes" [recipe]="recipe"
        (recipeToDisplay)="selectRecipe($event)"></rb-recipe-list-item>
```
[recipe-list.component.ts](src/app/recipe/recipe-list/recipe-list.component.ts)
```angular2
@Output() selectedRecipe: EventEmitter<Recipe> = new EventEmitter();
  selectRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
```
[recipe-view-container.component.html](src/app/recipe/recipe-view-container/recipe-view-container.component.html)
```angular2html
  <div class="col-md-5">
    <rb-recipe-list (selectedRecipe)="selectedRecipe = $event"></rb-recipe-list>
  </div>
  <div class="col-md-7">
    <rb-recipe-details *ngIf="selectedRecipe; else infoText" [recipe]="selectedRecipe"></rb-recipe-details>
        <ng-template #infoText>
          <p>Please select a recipe</p>
        </ng-template>
  </div>
```
[recipe-view-container.component.ts](src/app/recipe/recipe-view-container/recipe-view-container.component.ts)
```angular2
  selectedRecipe: Recipe;
```
[recipe-details.component.ts](src/app/recipe/recipe-details/recipe-details.component.ts)
```angular2
    @Input() recipe: Recipe;
```

This is not optimize approach, we will improve this and make changes.

### Adding Ingredient to shopping list
