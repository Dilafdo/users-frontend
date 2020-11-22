import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.header = this.id === '0' ? 'Add user' : 'Edit user';

    if (this.id !== '0') {
      this.userService.getUser(this.id)
        .subscribe(value => {
          console.log('user', value);
          // @ts-ignore
          this.user = value;
        });
    }
  }

  onSubmit(form: NgForm) {
    console.log('submitted', form.value);
    const user: User = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      contactNo: form.value.contactNo
    };

    if (this.id === '0') {
      this.userService.addUser(user).then(data => {
        this.response = data;
        console.log('page', this.response);
      });
    } else {
      this.userService.editUser(this.id, user)
        .subscribe(value => {
          console.log('updated');
        });
    }
    this.router.navigateByUrl('').then();
  }

}
