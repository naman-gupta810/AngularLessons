# Chapter 5 Routing
In this chapter we will learn about routing. Till we are showing everything in one go, Using ngIf to hide and show
content. But this is going to load page at one go, and then it is showing and hiding content on basis of ngIf condition,
but our URL is static, we are not able to see any change in that. Now we will look method which changes the URL, but still
don't load all of the page only load and replace major content of the page on the basis of the link or URL we called.

## Setting up and Load routes
To setup the routes we will follow through below steps:
 * Declare the routes in module in a constants, which defines path and what component to load. Ex:
  ```
  const routes: Routes = [{path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent},
    {path: 'servers', component: ServersComponent}];
  ```

  * Include Router Module in your project and pass created constant to it's forRoot method. This will enable routes
and load the defined components. Ex:
  ```angular2
    imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot(routes)
    ]
  ```

  * Define the place in template which need to change using tag router outlet like below:
   ```angular2html
    <div class="row">
        <div class="col-sm m-3">
          <div class="tab-pane fade show active">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
   ```
   So In here router-outlet will be replaced by the component we provided in the routes, whenever URL changes.
   
   * Creating link for our routers. We can't give links to href, if we provide the links in the href tag of HTML link,
   It will reload the page and it will no more a single page application. So we will create the links using Angular 
   router directives <b>routerLink</b>
   ```angular2html
       <li class="nav-item nav-link active"><a routerLink="/">Home</a></li>
       <li class="nav-item nav-link"><a routerLink="/servers">Servers</a></li>
       <li class="nav-item nav-link"><a [routerLink]="['/users']">Users</a></li>
   ```
   To a quick note if we want to give relative path to component we are currently then we can directly give the path
   like routerLink="servers" but if you want to give path from the root of site you need to use "/servers" as value
   of routerLink.
   
   * Currently routes looks fine, but one issue we can see tabs or links not get active. On changing route we can style
   our links with RouterModule directive <b>routerLinkActive</b> directive with class value to change styling of links
   on route changes.
   ```angular2html
        <li class="nav-item nav-link" routerLinkActive="active"><a routerLink="/">Home</a></li>
        <li class="nav-item nav-link" routerLinkActive="active"><a routerLink="/servers">Servers</a></li>
        <li class="nav-item nav-link" routerLinkActive="active"><a [routerLink]="['/users']">Users</a></li>
   ```
   
   But when we put this, we can see this is working, but there is a issue when we select servers or users still Home
   is selected, this is happening routerLinkActive check path and mark all the links which is contained in the path,
   so "/" is contained in both the paths which makes it to put the class on home as well. To fix this issue we will
   put a config on routerLinkActive, using directive routerLinkActiveOptions, so our links looks like:
   ```angular2html
            <li class="nav-item nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a routerLink="/">Home</a></li>
            <li class="nav-item nav-link" routerLinkActive="active"><a routerLink="/servers">Servers</a></li>
            <li class="nav-item nav-link" routerLinkActive="active"><a [routerLink]="['/users']">Users</a></li>
   ```
   
   * Till now we have seen routing from the template. Also sometimes we need navigate through code after some logic completion or
   some process. We will navigate to other routes using below code:
   ```angular2
        onclickNavigate(): void {
          this.router.navigate(['home']); // this will be used when we want to route from the root of the application
          // this.router.navigate(['home'],{ relativeTo: this.activatedRoute}); // this will be used when we want to route from relative path
          // and activated route path contains current path information and other metadata for this service 
        }
   ```

## Setting Params, Query Params and Fragments and Retrieve them in typescript
  * For setting up the Parameters in path, we need to define path in route array. For this we will append the parameter with ':' 
  which tells Angular to parse that as parameter and then we will get this parameter in our typescript file. Ex.:
    
    app.module.ts
    ```angular2
       {path: 'users/:id/:name', component: UserComponent}
    ```
    
    users.component.html
    ```angular2html
     <a
           href="#"
           class="list-group-item"
           *ngFor="let user of users" [routerLink]="['/users',user.id,users[i].name]">
           {{ user.name }}
         </a>
    ```
    user.component.ts
    ```angular2
      export class UserComponent implements OnInit {
        user: { id: number, name: string };
      
        constructor(private route: ActivatedRoute) {
        }
      
        ngOnInit() {
          this.user = {
            id: this.route.snapshot.params['id'],
            name: this.route.snapshot.params['name']
          };
          this.route.params.subscribe((params: Params) => {
              this.user.id = params['id'],
                this.user.name = params['name'];
            }
          );
        }
    ```
    Like in above code we can see we used snapshot and then we subscribe the params object. This is needed because if 
    we click on a link that link redirect us to same component, then angular will not re-create the component and change
    the parameters, which an be handle via observables and then we can perform something to update the page. The snapshot
    we only get when angular creates a component. Like we have subscribe the params, when the component will be destroyed
    we need to destroy or unsubscribe the observables, but this is angular did for you already so whenever the component
    get destroy it will unsubscribe the observer, so If you unsubscribe or not it will not impact your application as 
    angular taken care of that.
    
  * Passing query parameters and Fragments : To pass the query parameters from the HTML template we will use below 
    syntax:
      ```angular2
         <a
              href="#"
              class="list-group-item"
              *ngFor="let server of servers" [routerLink]="['/servers',server.id,'edit']" 
              [queryParams]="{'allowEdit' :1, 'prodServer': true}"
                [fragment]="'loading'">
              {{ server.name }}
          </a>
      ```
      Above code will generate link like 'http://localhost:4200/servers/1/edit?allowEdit=1&prodServer=true#loading'
      in which allowEdit and prodServer are query parameters and after #loading is fragment of page we want to jump to.
      
  * Now If we want to pass the queryParameters in programmatic way then we will use below code.
    ```angular2
       this.router.navigate(['/servers', serverId, 'edit'],
            {
              queryParams: {allowEdit: 1, prodServer: false},
              fragment: 'loading'
            });
    ``` 
    
  * Retrieving and using query parameter and fragment in typescript code.
    ```angular2
       ngOnInit() {
          console.log('Allow Edit ' + this.route.snapshot.queryParams['allowEdit']);
             console.log('Is prod server ' + this.route.snapshot.queryParams['allowEdit']);
             console.log('This page fragment ' + this.route.snapshot.fragment);
             let loadServerId = 1;
             if (this.route.snapshot.params['id']) {
               loadServerId = +this.route.snapshot.params['id'];
             }
             this.route.params.subscribe((params: Params) => {
               this.server = this.serversService.getServer(+params['id']);
             });
             this.server = this.serversService.getServer(loadServerId);
             this.serverName = this.server.name;
             this.serverStatus = this.server.status;
        }
    ```
    Similar like params they have snapshot and observables, So If component is not creating again by angular any point
    of time, you need to subscribe the queryParams and fragments and then perform the desired logic. 
    
    **Always remember when you are using params or queryParams the object you got is string, If you want to pass
    a different datatype then you need to convert and then pass as we have done in above code using   
    loadServerId = +this.route.snapshot.params['id']**
    

### Setting up child routes

