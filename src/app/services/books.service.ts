import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../books/interface/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private urlBase = 'http://localhost:80/api/books';

  constructor(private httpClient: HttpClient) {} 
    getListBooks(): Observable<Book[]>{
      const url: string = `${this.urlBase}/all`;
      return this.httpClient.get<Book[]>(url);
    }

    getListBooksByPublisher(publisher: string): Observable<Book[]>{
      const url: string = `${this.urlBase}/publisher/${publisher}`;
      return this.httpClient.get<Book[]>(url);
    }

    deleteBook(isbn: number): Observable<Book>{
      const url: string = `${this.urlBase}/delete/${isbn}`;
      return this.httpClient.delete<Book>(url);
    }
}

