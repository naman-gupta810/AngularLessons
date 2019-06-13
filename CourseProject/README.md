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
  3. Now cleaned up the app component change with rb as prefix and change the initialize module as did in chapter 1.
   
