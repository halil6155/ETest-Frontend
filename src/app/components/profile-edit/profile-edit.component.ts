import { AlertifyService } from '@app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserSingleModel } from '@app/models/user/userSingleModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '@app/services/validation.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  userUpdateFormGroup: FormGroup;
  userSingleModel: UserSingleModel;
  fileData: any = null;
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    public validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createFormGroup();
  }
  get getControls() {
    return this.userUpdateFormGroup.controls;
  }
  imageChanged(event) {
    this.fileData = event.target.files[0];
  }
  imageUpload() {
    let formData = new FormData();
    formData.append('image', this.fileData);
    this.userService.imageUpload(formData).subscribe();
  }
  createFormGroup() {
    this.userUpdateFormGroup = new FormGroup({
      id: new FormControl(this.userSingleModel.id, Validators.required),
      firstName: new FormControl(this.userSingleModel.firstName, [
        Validators.required,
        Validators.maxLength(25),
      ]),
      lastName: new FormControl(this.userSingleModel.lastName, [
        Validators.required,
        Validators.maxLength(25),
      ]),
      email: new FormControl(this.userSingleModel.email, [
        Validators.required,
        Validators.maxLength(50),
        Validators.email,
      ]),
    });
  }
  getUser() {
    this.activatedRoute.data.subscribe((result) => {
      this.userSingleModel = result.data.data;
    });
  }
  update() {
    if (this.userUpdateFormGroup.valid) {
      if (this.fileData != null) this.imageUpload();
      this.userService.update(this.userUpdateFormGroup.value).subscribe(
        () => {
          this.alertifyService.success('Kayıt Güncellendi!');
        },
        () => this.alertifyService.error('Kayıt Güncellenemedi!')
      );
    }
  }
}
