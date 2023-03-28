import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Person } from 'src/app/core/models/person.model';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent implements OnInit{

  @Input() label= '';
  @Output() private selected = new EventEmitter<Person>();
  persons$!: Observable<Person[]>;
  private searchTerm = new Subject<string>();

  constructor(private personService: PersonService){}

  ngOnInit():void{
    this.persons$ = this.searchTerm.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(term => this.personService.search(term))
    );
  }

  onSelected(selectedItem : MatAutocompleteSelectedEvent):void{
    this.searchTerm.next('');

    const person: Person = selectedItem.option.value;
    this.selected.emit(person);
  }
  search(term:string):void{
    this.searchTerm.next(term);
  }
}
