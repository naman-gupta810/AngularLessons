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

[header.component.html](src/app/common/header/header.component.html)
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
[header.component.ts](src/app/common/header/header.component.ts)
```angular2
 @Output() menuClicked: EventEmitter<string> = new EventEmitter();

onSelect(menuItem: string) {
    this.menuClicked.emit(menuItem);
  }
```
[recipe-book-root.component.html](src/app/recipe-book-root.component.html)
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
[recipe-book-root.component.ts](src/app/recipe-book-root.component.ts)
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
We will add the ingredient from the Input form to list of ingredients. For this we can use ViewChild and then can access
element and get value build the ingredient and emit event which will add to list. But for our use case We are using two-way
binding using ngModel and then emit an event to list component and add this to array of ingredients.

[shopping-edit.component.html](src/app/cart/shopping-edit/shopping-edit.component.html)
```angular2html
  <div class="col-md-4 mb-3">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Name" ([ngModel])="ingredient.name">
        </div>

        <div class="col-md-4 mb-3">
          <label for="amount">Amount</label>
          <input type="number" class="form-control" id="amount" step="0.1" placeholder="amount" ([ngModel])="ingredient.amount">
        </div>

        <div class="col-md-4 mb-3">
          <label for="unitSelect">Unit</label>
          <select class="custom-select" id="unitSelect" ([ngModel])="ingredient.unit">
            <option selected>Choose Unit</option>
            <option value="gm">gm (Gram)</option>
            <option value="ml">ml (Milliliter)</option>
            <option value="unit">Unit (Nos.)</option>
            <option value="kg">kg (Kilogram)</option>
            <option value="l">l (Liter)</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-2">
          <button class="btn btn-success btn-block" type="submit" (click)="onIngredientAdd()">Add</button>
        </div>
```
[shopping-edit.component.ts](src/app/cart/shopping-edit/shopping-edit.component.ts)
```angular2
ingredient: Ingredient = new Ingredient('Test', 0.1, 'ml');
  @Output() ingredientAdd: EventEmitter<Ingredient> = new EventEmitter();
    onIngredientAdd() {
      console.log(this.ingredient);
      this.ingredientAdd.emit(this.ingredient);
    }
```
[shopping-list.component.html](src/app/cart/shopping-list/shopping-list.component.html)
```angular2html
  <div class="col-sm-12">
    <rb-shopping-edit (ingredientAdd)="ingredients.push($event)"></rb-shopping-edit>
  </div>
```

### Building and using services
As we have two main features of application we will build two service, One manages the recipe
and other manages the shopping-cart. We will use services for cross-component communication.
 
 
For this we have created below two services:
* [Recipe Service](src/app/recipe/recipe.service.ts)
* [Shopping-cart Service](src/app/cart/shopping-cart.service.ts)

Then we removed almost all event binding and used service to emit and subscribe the event.
After this we also added one function to put all the recipe ingredients to shopping list. 

### Setting up routes & Forms
We had added forms in shopping-cart, recipe edit and new recipe. Then we create routes and child routes for
the recipe.

We had designed shopping-cart form as template driven form while the recipe form is reactive form in which we
are using component to add dynamically.

### Creating dynamic component
We have also created a sample login, Just consider we want to show model in the UI as error message. We have to approach for this
one is ngIf which we have used to show toasts. Now we will see a programmatic way to create components.

For this we need to create component class which we need to create dynamically. We created below class and it's template for the
same.

[modal.component.ts](src/app/common/modal/modal.component.ts)
[modal.component.html](src/app/common/modal/modal.component.html)


Now We need to create warning on the login page, for that we need place a placeholder and then we need ViewContainerRef to add 
our component to this. So we will inject viewcontainerref in directive. Below is directive we created for this:

[placeholder.directive.ts](src/app/placeholder.directive.ts)

Now to add component in directive's view container from login component, first we need to add directive in template and then 
We need to inject ComponentFactoryResolver in login component and get the reference of directive, then we will add component 
using below code:

```angular2
      constructor(private authService: AuthService, private router: Router,
                  private toastService: ToastService, private compResolver: ComponentFactoryResolver) {
      }
      @ViewChild(PlaceholderDirective, {static: false}) errorHolder: PlaceholderDirective;
```
```angular2
      const modalFactory = this.compResolver.resolveComponentFactory(ModalComponent);
      const errorContainer = this.errorHolder.vcRef;
      errorContainer.clear();
      const modalRef = errorContainer.createComponent(modalFactory);
      modalRef.instance.title = 'Login Error';
      modalRef.instance.message = 'Username or password not correct';
      this.closeSubs = modalRef.instance.close.subscribe(() => {
        this.closeSubs.unsubscribe();
        errorContainer.clear();
      });
```
The modelref.instance we are using access properties of component and to initialize them. The subscription we are using
perform close operation of the component and we clear using programmatically. For this to work we need to do one more step
which is defining the component in the entryComponents of module. It need to declare there because for rest of the component
it recognize via template or routes, but this component is neither used in template nor declared in the route.


### Optimizing Modules
It is recommended to use feature modules. We can split our application into features module that keep our code clean.
Also we can take advantage of this, we can load our application in bundles, When we visit our application initial
bundle in Main AppComponent will be loaded, then we visit a particular url then rest of module for that feature will
be downloaded. To do this we need to add below code in our appRoute which will load desired module on visiting
the url. One important part is when we load the module using the path, then all component of the module 
routes start with the prefix url of module and then the feature module route is appened and loaded.
```angular2
const routes: Routes = [{
  path: 'your-path',
  loadChildren: () => import('./your-module-path/module-name.module').then(m => m.ModuleName)
}];
```

But with we may experience a lag in response of modules, So if we want to download immediate module that will be used
with current module then we need to pass below argument:
```angular2
RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModule})
```

Recommendation for using services: Try to inject services in root, if you provide the service in module, it will
create multiple instances depending on numbers of time you declared in modules. And that can cause bugs in your 
application so as a recommended practice inject service in root, so that only one instance is available throughout the
application.


