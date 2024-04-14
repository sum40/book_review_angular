import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { VerificationService } from './verification.service';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [VerificationService],
  },
  {
    path: 'books/:type/:_id',
    component: BooksComponent,
    canActivate: [VerificationService],
  },
  {
    path: 'add-book',
    component: AddBookComponent,
    canActivate: [VerificationService],
  },
];
