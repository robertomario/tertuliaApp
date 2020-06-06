import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {

  nameGroup: string;
  loadAdd = false;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  createGroup() {
    this.loadAdd = true;
    this.afAuth.user.pipe(take(1)).subscribe(async (user) => {
      const random = await this.generateNodeGroup(this.nameGroup, user.uid);
      await this.addGroupToUser(random, user.uid);
      this.nameGroup = null;
      this.loadAdd = false;
    });
  }

  async generateNodeGroup(name: string, uid: string) {
    const random = Math.floor(Math.random()*1000000);
    await this.db.object(`groups/${random}/`).set({
      uid: random,
      members: {
        [uid]: true
      },
      name
    });
    return random;
  }

  async addGroupToUser(groupUID: number, userUID: string) {
    await this.db.object(`users/${userUID}/groups/`).update({
      [groupUID]: true
    })
  }

}
