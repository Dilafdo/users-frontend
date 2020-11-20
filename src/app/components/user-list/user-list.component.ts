import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [
    {
      firstName: 'Dilan',
      lastName: 'Isuru',
      contactNo: '0765485577'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
