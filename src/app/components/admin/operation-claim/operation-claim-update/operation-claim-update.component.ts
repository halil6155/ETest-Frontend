import { AlertifyService } from '@app/services/alertify.service';
import { ValidationService } from '@app/services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationClaimSingleModel } from '@app/models/operationClaim/OperationClaimSingleModel';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperationClaimService } from '@app/services/operation-claim.service';

@Component({
  selector: 'app-operation-claim-update',
  templateUrl: './operation-claim-update.component.html',
  styleUrls: ['./operation-claim-update.component.css'],
})
export class OperationClaimUpdateComponent implements OnInit {
  operationClaimSingleModel: OperationClaimSingleModel;
  operationClaimUpdateFormGroup: FormGroup;
  constructor(
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private operationClaimService: OperationClaimService,
    public validationService: ValidationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getOperationClaim();
    this.createFormGroup();
  }
  get getControls() {
    return this.operationClaimUpdateFormGroup.controls;
  }
  createFormGroup() {
    this.operationClaimUpdateFormGroup = new FormGroup({
      id: new FormControl(
        this.operationClaimSingleModel.id,
        Validators.required
      ),
      name: new FormControl(this.operationClaimSingleModel.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }
  getOperationClaim() {
    this.activatedRoute.data.subscribe((result) => {
      this.operationClaimSingleModel = result.data.data;
    });
  }
  update() {
    if (this.operationClaimUpdateFormGroup.valid) {
      this.operationClaimService
        .update(this.operationClaimUpdateFormGroup.value)
        .subscribe(
          () => { this.alertifyService.success('Kayıt Güncellendi!'); this.router.navigateByUrl('/admin/operation-claim-list'); },
          (error) => this.alertifyService.error(error)
        );
    }
  }
}
