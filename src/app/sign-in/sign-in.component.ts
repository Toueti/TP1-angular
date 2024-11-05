import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignIn() {
    if (this.signInForm.valid) {
      const formData = this.signInForm.value;

      this.http.post('/api/signin', formData).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.successMessage = 'Registration successful, please log in.';
          this.signInForm.reset();
          setTimeout(() => this.router.navigate(['/sign-in']), 2000);
        },
        error: (err) => {
          console.error('Signup failed', err);
          this.errorMessage = 'Registration failed. Username might already be taken.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
  }
}
