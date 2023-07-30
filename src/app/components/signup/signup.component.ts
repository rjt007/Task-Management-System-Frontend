import { Component } from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = new User();
  error:string='';

  constructor(private userService: UserService, private router:Router) { }

  signUp() {
    this.userService.signup(this.user).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (err) => this.error = err.error
    });
  }
}
