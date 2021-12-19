import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from '../../interface/book.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmarComponent } from 'src/app/components/confirmar/confirmar.component';
import { MatDialog } from '@angular/material/dialog';
import { DetallesComponent } from 'src/app/components/detalles/detalles.component';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  books: Book[] = []
  book!: Book  
  
  findByPublisher: Boolean = false;
  
  constructor(private bookService: BooksService, private fb: FormBuilder, public dialog: MatDialog) {   
  }

  miFormulario: FormGroup = this.fb.group({
    publisher: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
       
      ],
    ],
    
  });

  ngOnInit(): void {    
    this.getAllBooks()
  }

  getBookByPublisher(publisher: string){  
    
      this.findByPublisher = true;
      this.miFormulario.reset()
      this.bookService.getListBooksByPublisher(publisher).subscribe(
        (books)=>{          
          this.books = books;  
                                            
        },
        (error)=>{          
          console.log(error)                                    
        }
        )     
  }

  getAllBooks(){   
    
    this.findByPublisher = false             
    this.bookService.getListBooks().subscribe(
      (books) =>{
        this.books = books        
                    
      },
      (error)=>{
        console.log(error)                   
      }
    )    
  }

  deleteBook(book: Book){
    this.book = book
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: { ...this.book },
    });
    dialog.afterClosed().subscribe((result)=>{
      if(result){
        this.bookService.deleteBook(book.isbn).subscribe(
          (_)=>{                
            window.location.reload();
          },
          (error)=>{
            console.log(console.log(error))       
          }
        )
      }
    })
    
  }

  detailsBook(book: Book){
    this.book = book
    const dialog = this.dialog.open(DetallesComponent, {
      width: '350px',
      data: { ...this.book },
    });
    dialog.afterClosed().subscribe((result)=>{
      
    })
  }

  validarCampo(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  get validatorPublisher(){
    const errors = this.miFormulario.get('publisher')?.errors;

    if (errors?.minlength) {
      return 'Minimum 3 characters';
    } else if (errors?.required) {
      return 'Required field';
    } 
    return '';
  }

  cosa(book: Book){
    console.log(book)
  }
  

}
