import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from 'src/app/core/models/dialog-data.model';
import { Person } from 'src/app/core/models/person.model';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  displayedColumns: string[] = ['id','name','actions'];
  persons: Person[] = [];

  constructor(private matDialog: MatDialog, private personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(){
    this.personService.getAll().subscribe(
      (persons) => this.persons = persons,
      (err) => console.log(err),
      () => console.log('Ok')
    );
  }

  delete(person: Person): void{
    const dialogData: DialogData = {
      cancelText:'Cancel',
      confirmText:'Delete',
      content: `Delete '${person.name}'?`
    }

    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(conf => {
      if(conf){
        this.personService.delete(person).subscribe(() => {
          this.getPersons();
        })
      }
    })

  }

  onSelected(person: Person):void{
    this.router.navigate(['/person',person.id]);
  }
}
