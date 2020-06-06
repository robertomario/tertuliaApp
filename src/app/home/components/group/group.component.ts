import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroupModalComponent } from './../group-modal/group-modal.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, switchMap, filter } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { GroupModel } from '../../../core/models/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

  $listGroup: Observable<GroupModel[]>;

  constructor(
    private dialog: MatDialog,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.$listGroup = this.afAuth.user.pipe(
      take(1),
      switchMap((user) => this.db.object(`users/${user.uid}/groups/`).valueChanges()),
      filter((data) => !!data),
      map((data) => Object.keys(data)),
      map((data) =>
        data.map((key) =>
          this.db
            .object<GroupModel>(`groups/${key}/`)
            .valueChanges()
            .pipe(
              map((obj) => ({ ...obj, members: Object.keys(obj.members) }))
            )
        )
      ),
      switchMap((data) => combineLatest(data))
    );
  }

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(GroupModalComponent);
  }
}
