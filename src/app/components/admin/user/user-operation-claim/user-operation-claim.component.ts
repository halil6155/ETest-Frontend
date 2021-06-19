import { AlertifyService } from '@app/services/alertify.service';
import { UserService } from '@app//services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserOperaionClaimModel } from '@app/models/user/userOperaionClaimModel';

@Component({
  selector: 'app-user-operation-claim',
  templateUrl: './user-operation-claim.component.html',
  styleUrls: ['./user-operation-claim.component.css'],
})
export class UserOperationClaimComponent implements OnInit {
  userOperationClaimModel: UserOperaionClaimModel[];
  constructor(
    private router: Router,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserOperationClaim();
  }
  getUserOperationClaim() {
    this.activatedRoute.data.subscribe((result) => {
      this.userOperationClaimModel = result.data.data;
    });
  }
  update() {
    this.userService.addOperationClaim(this.userOperationClaimModel).subscribe(
      () => this.router.navigateByUrl('admin/user-list'),
      (error) => this.alertifyService.error(error)
    );
  }
}
