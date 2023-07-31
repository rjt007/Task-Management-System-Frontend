import { Component } from '@angular/core';
import {User} from '../../user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent {
  user: User = new User();
  error:string='';
  update:string='';
  login:boolean=false;

  constructor(private userService: UserService) { }

  forget() {
    this.userService.forget(this.user).subscribe({
      complete: () => {this.update = 'Password updated successfully!'; this.login = true},
      error: (err) => this.error = err.error
    });
    this.user = new User();
    setTimeout(()=>{
      this.update='';
    },4000);
  }
}
