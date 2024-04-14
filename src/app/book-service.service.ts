import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookInterface } from './book-interface';
@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  private baseUrl = 'http://localhost:3000/api/books/getBookList';

  constructor(private httpClient: HttpClient) {}

  getBooks(): Observable<BookInterface[]> {
    return this.httpClient.get<BookInterface[]>(this.baseUrl, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  addBook(Book: BookInterface): Observable<any> {
    const url = `http://localhost:3000/api/books/addBooks`;
    return this.httpClient.post(url, Book, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
  deleteTask(_id: string) {
    const url = `http://localhost:3000/api/books/delete`;
    return this.httpClient.delete(url + '/' + _id, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  updateComment(
    bookId: string | number,
    newComment: string,
    userName: string
  ): Observable<any> {
    const url = `http://localhost:3000/api/books//update/${bookId}`;
    return this.httpClient.put(
      url,
      { Comment: newComment, userName },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
