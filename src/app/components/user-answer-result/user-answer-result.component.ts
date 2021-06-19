import { AuthService } from '@app/services/auth.service';
import { UserAnswerService } from '@app/services/user-answer.service';
import { UserAnswerListResultModel } from '@app/models/userAnswer/userAnswerListResultModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-answer-result',
  templateUrl: './user-answer-result.component.html',
  styleUrls: ['./user-answer-result.component.css'],
})
export class UserAnswerResultComponent implements OnInit {
  userAnswerListResultModel: UserAnswerListResultModel[];
  constructor(
    private userAnswerService: UserAnswerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserResults();
  }
  getUserResults() {
    this.userAnswerService.getUserResults(
      this.authService.decodedTokenModel.nameid
    ).subscribe((result)=>{
      this.userAnswerListResultModel=result.data;
    });
  }
}
