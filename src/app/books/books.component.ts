import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BookServiceService } from '../book-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  imports: [
    HeaderComponent,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class BooksComponent {
  @Output()
  bookDeleted: EventEmitter<string> = new EventEmitter();

  _id = '';

  books: any;
  book: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private bookService: BookServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  formbuild = inject(FormBuilder);

  commentForm: FormGroup = this.formbuild.group({
    name: [''],
    comment: [''],
  });

  ngOnInit(): void {
    this._id = this.route.snapshot.params['_id'];

    this.getBook();
  }

  getBook() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
      let index = this.books.findIndex(
        (book: { _id: string }) => book._id == this._id
      );
      if (index > -1) {
        this.book = this.books[index];
      }
    });
  }

  deleteTask() {
    console.log(this.book._id);
    this.bookService.deleteTask(this.book._id || '').subscribe(
      (res) => {
        this.router.navigateByUrl('/home');
        this.book = res;
        console.log('Review updated successfully:', res);
      },

      (error) => {
        console.error('Failed to update review:', error);
      }
    );
  }

  saveComment() {
    const bookId = this.book._id;
    const newComment = this.commentForm.value.comment;
    const userName = this.commentForm.value.name;
    console.log(newComment, userName);
    this.bookService.updateComment(bookId, newComment, userName).subscribe(
      (res) => {
        this.book = res;
        console.log('Comment updated successfully:', res);
      },
      (error) => {
        console.error('Failed to update Comment:', error);
      }
    );
    window.location.reload();
  }
}
