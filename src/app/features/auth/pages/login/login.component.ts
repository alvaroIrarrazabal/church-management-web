import { Component } from '@angular/core';
import { AuthHeaderComponent } from '../../components/auth-header/auth-header.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthHeaderComponent,LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
