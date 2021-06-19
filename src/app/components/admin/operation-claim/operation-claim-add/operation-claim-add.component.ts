import { AlertifyService } from '@app/services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OperationClaimService } from '@app/services/operation-claim.service';
import { ValidationService } from '@app/services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-claim-add',
  templateUrl: './operation-claim-add.component.html',
  styleUrls: ['./operation-claim-add.component.css'],
})
export class OperationClaimAddComponent implements OnInit {
  operationClaimAddFormGroup: FormGroup;
  constructor(
    private operationClaimService: OperationClaimService,
    private alertifyService: AlertifyService,
    private router:Router,
    public validationService:ValidationService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }
  get getControls()
  { 
    return this.operationClaimAddFormGroup.controls;
  } 
  createFormGroup() {
    this.operationClaimAddFormGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }
  add() {
    if (this.operationClaimAddFormGroup.valid) {
      this.operationClaimService
        .add(this.operationClaimAddFormGroup.value)
        .subscribe(
          () =>{
            this.alertifyService.success('Kayıt Eklendi!'),
            this.router.navigateByUrl('/admin/operation-claim-list');
          },
          (error) => this.alertifyService.error(error)
        );
    }
  }
}
