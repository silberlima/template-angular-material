import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../core/models/person.model';
import { PersonService } from '../core/services/person.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  persons : Person[] = [];
  constructor(private personService: PersonService,  private router:Router){}

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons():void{
    this.personService.getAll().subscribe(persons => this.persons = persons)
  }

  onSelected(person: Person):void{
    this.router.navigate(['/person',person.id]);
  }
}
