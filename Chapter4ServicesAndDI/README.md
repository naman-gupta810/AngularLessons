# Chapter 4 Services and Dependency Injection
Services are one of most important part of our application. We can user services to have cross-cutting logic like 
logging, HTTP calls or as central repository for the data. 

For demonstrate benefits and advantage we get from services, In initial commit of this chapter we have application
which use the data binding and event binding to pass the data and stores into root component class. We will use
Services to remove long data binding and event binding chains and store the data in a centralize place from where 
different component can interact.

### How to create service
To create a service we just need to create a class, we can optionally put the @Injectable decorator depends on the
how we want to inject the service, but on this later on this chapter. To create a service we just need to create
a class and put the logic or data storage component within it. Now how we are going to use this service, so first
thumb rule about service, never ever create an instance of the service.Angular will initialize an instance for you 
while creating the component or booting the application and provide this instance and inject it to your component.
Now question comes how to inject this service, So for that declare service reference in constructor and 
add the service to providers array of the component and Angular will create an instance of service for that component
and inject into it and same instance will be provided to this component's child component.

Now if you want a single instance throughout the application like data service, then we will declare service in AppModule
providers array or in root of application using  '@Injectable({providedIn: 'root'})', which provide same instance 
available throughout the application.

#### Component Injected service Example 
Service - [logging.service.ts](src/app/logging.service.ts)


Injected in account component using provider array - [account.component.ts](src/app/account/account.component.ts)


Injected in new account component using provider array - [new-account.component.ts](src/app/new-account/new-account.component.ts)


Both the component get different instance of Logging service. 

#### Root level injected service
Service - [account-data.service.ts](src/app/account-data.service.ts)


Not since this service is available in the root of application we can get instance of this service anywhere in application.
If we are injecting a service in another service, then receiver service should use @Injectable decorator, otherwise Angular
will not able to inject one service into another service.
 
