import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form: FormGroup = new FormGroup({});

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
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]*$'),
        Validators.minLength(10), Validators.maxLength(10)]],
      userName: ['', [Validators.required, Validators.pattern('^[A-z-0-9]*$')]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
    });
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

  get f(){
    return this.form.controls;
  }

  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onSubmit() {
    console.log('submitted', this.form.value);
    const user: User = {
      userName: this.form.value.userName,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      contactNo: this.form.value.contactNo,
      email: this.form.value.email
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
