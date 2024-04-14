import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    NgbRating,
    HttpClientModule,
    NgbRatingModule,
    // BrowserModule,
  ],
})
export class HomeComponent implements OnInit {
  trendingBooks: any;

  constructor(
    private router: Router,
    private BookService: BookServiceService
  ) {}

  ngOnInit() {
    this.BookService.getBooks().subscribe((res) => {
      this.trendingBooks = res;
      console.log(this.trendingBooks);
    });
  }

  // ngOnInit(): void {
  //   this.BookService.getAllTasks().subscribe((res) => {
  //     this.trendingBooks = res;
  //     console.log(this.trendingBooks);
  //   });
  // }

  // getTrendingBooks() {
  //   this.BookService.getAllTasks().subscribe((res) => {
  //     this.trendingBooks = res;
  //     console.log(this.trendingBooks);
  //   });
  // }

  goToBook(type: string, _id: string) {
    this.router.navigate(['books', type, _id]);
  }
}
