import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: string;
  header: string;
  response: any;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.header = this.id === '0' ? 'Add user' : 'Edit user';
  }

  onSubmit(form: NgForm) {
    console.log('submitted', form.value);
    const user: User = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      contactNo: form.value.contactNo
    };

    this.userService.addUser(user).then(data => {
      this.response = data;
      console.log('page', this.response);
    });
  }

}
