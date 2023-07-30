import { Component } from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  error:string='';

  constructor(private userService: UserService, private router:Router) { }

  logIn() {
    this.userService.login(this.user).subscribe({
      complete: () => this.router.navigateByUrl('/tasks'),
      error: (err) => this.error = err.error
    });
  }
}
