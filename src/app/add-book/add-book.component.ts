import { HeaderComponent } from '../header/header.component';

import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BookServiceService } from '../book-service.service';
import { BookInterface } from '../book-interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddBookComponent {
  catagoryOfBooks = [
    'Thriller',
    'Horror ',
    'Romantic',
    'Sci-fi ',
    'Non-fiction ',
  ];
  constructor(
    private formBuilder: FormBuilder,
    private bookservice: BookServiceService,
    private router: Router
  ) {}
  bookForm = this.formBuilder.group({
    title: '',
    catagory: '',
    author: '',
    imageLink: '',
    language: '',
    year: '',
    review: '',
    userDisplayName: '',
  });

  addBook() {
    this.bookservice
      .addBook(this.bookForm.value as BookInterface)
      .subscribe((res) => {
        this.router.navigateByUrl('/home');
      });
  }
}
