import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupModalComponent } from './../group-modal/group-modal.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.user.pipe(take(1)).subscribe((user) => {
      this.db
        .object(`users/${user.uid}/groups/`)
        .valueChanges()
        .pipe(map((data) => Object.keys(data)))
        .subscribe((data) => {
          const resultQuery = data.map(key => this.db.object(`groups/${key}/`).valueChanges().pipe(take(1)));
          forkJoin([...resultQuery]).subscribe((dataFinal) => {
            console.log(dataFinal);
          })
        });
    });
  }

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(GroupModalComponent);
  }
}
