import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../../../model/user';
import {Router} from '@angular/router';
import {ToastService} from '../../toast/toast.service';
import {ToastMessage} from '../../../model/toast-message';
import {PlaceholderDirective} from '../../../placeholder.directive';
import {ModalComponent} from '../../modal/modal.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'rb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('signInForm', {static: false}) signInForm;
  @ViewChild(PlaceholderDirective, {static: false}) errorHolder: PlaceholderDirective;
  isLogin = true;
  closeSubs: Subscription;

  constructor(private authService: AuthService, private router: Router,
              private toastService: ToastService, private compResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.closeSubs) {
      this.closeSubs.unsubscribe();
    }
  }


  switchAuthModes() {
    this.isLogin = !this.isLogin;
  }

  authenticate() {
    const email = this.signInForm.value['email'];
    const password = this.signInForm.value['password'];
    if (this.isLogin) {
      const user: User = this.authService.login(email, password);
      if (user) {
        this.router.navigate(['/recipes']);
        this.toastService.publishMessage(new ToastMessage('Login',
          'Welcome! ' + user.email, 'lightblue'));
      } else {
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
      }
    } else {
      if (this.authService.signUp(email, password)) {
        this.isLogin = true;
        this.toastService.publishMessage(new ToastMessage('SignUp',
          'Signup Successful, You can login!', 'lightgreen'));
      } else {
        this.toastService.publishMessage(new ToastMessage('SignUp',
          'User already registered', 'lightpink'));
      }
    }
  }
}
