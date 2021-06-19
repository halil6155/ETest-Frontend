import { AuthService } from '@app/services/auth.service';
import { AlertifyService } from '@app/services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { UserAnswerMainResultListModel } from '@app/models/userAnswer/userAnswerMainResultListModel';
import { UserAnswerService } from '@app/services/user-answer.service';

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.css'],
})
export class QuestionResultComponent implements OnInit {
  userMainResultListModel: UserAnswerMainResultListModel[];
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private userAnswerService: UserAnswerService
  ) {}

  ngOnInit(): void {
    this.getMainResults();
  }
  getMainResults() {
    this.userAnswerService
      .getUserMainResults(this.authService.decodedTokenModel.nameid)
      .subscribe(
        (result) => {
          this.userMainResultListModel = result.data;
        },
        (error) => this.alertifyService.error(error)
      );
  }
}
