import { AlertifyService } from '@app/services/alertify.service';
import { OperationClaimListModel } from '@app/models/operationClaim/operationClaimListModel';
import { OperationClaimService } from '@app/services/operation-claim.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-claim-list',
  templateUrl: './operation-claim-list.component.html',
  styleUrls: ['./operation-claim-list.component.css'],
})
export class OperationClaimListComponent implements OnInit {
  operationClaimListModel: OperationClaimListModel[];
  constructor(
    private operationClaimService: OperationClaimService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getOperationClaims();
  }
  getOperationClaims() {
    this.operationClaimService.getList().subscribe(
      (result) => {
        this.operationClaimListModel = result.data;
      },
      (error) => this.alertifyService.error(error)
    );
  }
}
