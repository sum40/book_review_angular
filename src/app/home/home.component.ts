import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, HeaderComponent, NgbRatingModule],
})
export class HomeComponent implements OnInit {
  trendingBooks: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getTrendingBooks();
  }

  getTrendingBooks() {
    this.http
      .get('http://localhost:4200/assets/data/books.json')
      .subscribe((books) => {
        this.trendingBooks = books;
      });
  }

  goToBook(type: string, title: string) {
    this.router.navigate(['books', type, title]);
  }
}
