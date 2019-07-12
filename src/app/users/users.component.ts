import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  nid = 21;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
        .subscribe(users => this.users = users);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.log('Se agrego usuario con id:' + this.nid);
    this.users.push({ name, id: this.nid++ } as User);
/*    this.userService.addUser({ name, id: this.nid++ } as User)
        .subscribe(user => {
          this.users.push(user);
        });*/
  }

  delete(user: User): void {
    this.userService.log('Usuario eliminado con id:' + user.id);
    this.users = this.users.filter(h => h !== user);
/*    this.userService.deleteUser(user).subscribe();*/
  }

}
