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
  errorMsg = '';
  user: User = {
    userName: '',
    firstName: '',
    lastName: '',
    contactNo: '',
    email: ''
  };

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

  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onSubmit(form: NgForm) {
    console.log('submitted', form.value);
    const user: User = {
      userName: form.value.userName,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      contactNo: form.value.contactNo,
      email: form.value.email
    };

    if (this.id === '0') {
      this.userService.addUser(user).subscribe(success => {
        this.response = success;
        this.errorMsg = '';
        console.log('page', this.response, 'page errorMsg', this.errorMsg);
      }, error => {
        this.errorMsg = error.error.message;
        console.log('page errorMsg', this.errorMsg, ' page response', this.response);
      });
    } else {
      this.userService.editUser(this.id, user)
        .subscribe(success => {
          this.response = success;
          this.errorMsg = '';
        }, error => {
          this.errorMsg = error.error.message;
        });
    }

    await this.delay(100);

    if (this.errorMsg === '') {
      this.router.navigateByUrl('').then();
    }
  }

  onCancel() {
    this.router.navigateByUrl('').then();
  }

}
