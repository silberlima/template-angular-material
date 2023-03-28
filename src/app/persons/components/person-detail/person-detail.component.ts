import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/core/models/person.model';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {
  person!: Person;
  isEditing = false;

  form = this.formBuilder.group({
    id: [{ value: 0, disabled: true }],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId !== `new`) {
      this.isEditing = true;
      const id = Number(paramId);

      this.personService.getById(id).subscribe((person) => {
        this.person = person;
        this.form.controls['id'].setValue(person.id);
        this.form.controls['name'].setValue(person.name);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  create(): void {
    const { valid, value } = this.form;

    if (valid) {
      const person: Person = {
        name: value.name,
      } as Person;
      this.personService.create(person).subscribe(() => this.goBack());
    } else {
      this.showErrorMessage();
    }
  }

  update(): void {
    const { valid, value } = this.form;

    if (valid) {
      const person: Person = {
        id: this.person.id,
        name: value.name,
      } as Person;
      this.personService.update(person).subscribe(() => this.goBack());
    } else {
      this.showErrorMessage();
    }
  }

  private showErrorMessage(): void {
    this.snackBar.open('Please chech the errors found.', 'Ok', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
