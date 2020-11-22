import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.userService.getAllUsers().subscribe((users: any[]) => {
      this.users = users;
    });
  }

  onDelete(id: string) {
    console.log('id', id);
    this.userService.deleteUser(id)
      .subscribe(() => {
        this.fetchData();
        console.log('deleted');
      });
  }

}
