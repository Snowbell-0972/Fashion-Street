import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLogIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}
  
  userSignUp(data: SignUp) {
    console.warn(data)
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        //this.isSellerLogIn.next(true)
        localStorage.setItem('seller', JSON.stringify(result.body));
        alert('Successfully SignUp click on login button!!');
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLogIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLoginPage(data: login) {
    console.warn(data);
    this.http
      .get( `http://localhost:3000/seller?email=${data.email}&password=${data.password}`, // here we using backticks `` and make dynamic data
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length) {
          console.warn('Login successfully');
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.warn('Login failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
