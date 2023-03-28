import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Person } from '../models/person.model';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private personUrl = `${environment.baseUrl}/person`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAll(): Observable<Person[]> {
    return this.http
      .get<Person[]>(this.personUrl)
      .pipe(tap((persons) => this.log(`fetched ${persons.length}`)));
  }

  getById(id: number): Observable<Person> {
    return this.http
      .get<Person>(`${this.personUrl}/${id}`)
      .pipe(tap((persons) => this.log(`Fecthed ${this.descAtributes(persons)}`)));
  }

  search(term: string):Observable<Person[]>{
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Person[]>(`${this.personUrl}?name=${term}`)
    .pipe(
      tap(
          (persons) =>
          persons.length
          ? this.log(`found ${persons.length} person(s) matching "${term}`)
          : this.log(`no persons matching ${term}`)
        )
    );
  }

  update(person: Person): Observable<Person> {
    return this.http
      .put<Person>(`${this.personUrl}/${person.id}`, person)
      .pipe(tap((person) => this.log(`Updated ${this.descAtributes(person)}`)));
  }

  create(person: Person): Observable<Person> {
    return this.http
      .post<Person>(this.personUrl, person)
      .pipe(tap((person) => this.log(`Create ${this.descAtributes(person)}`)));
  }

  delete(person: Person): Observable<any>{
    return this.http.delete<any>(`${this.personUrl}/${person.id}`)
    .pipe(tap((person) => this.log(`Deleted ${this.descAtributes(person)}`)));
  }

  private descAtributes(person: Person): string {
    return `Person id=${person.id} and name=${person.name}`;
  }

  private log(message: string): void {
    this.messageService.add(`PersonService:${message}`);
  }
}
