import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
  ],
})
export class BooksComponent {
  type = '';
  title = '';
  url = '';
  books: any;
  book: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.title = this.route.snapshot.params['title'];

    this.url = 'http://localhost:4200/assets/data/books.json';

    this.getBook();
  }

  getBook() {
    this.http.get(this.url).subscribe((books) => {
      this.books = books;
      let index = this.books.findIndex(
        (book: { title: string }) => book.title == this.title
      );
      if (index > -1) {
        this.book = this.books[index];
      }
    });
  }
}
