import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBooksComponent } from './pages/list-books/list-books.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ListBooksComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule, ReactiveFormsModule
  ],
  exports: [ListBooksComponent]
})
export class BooksModule { }
