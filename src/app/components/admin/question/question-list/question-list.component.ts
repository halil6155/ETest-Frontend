import { AlertifyService } from '@app/services/alertify.service';
import { QuestionService } from '@app/services/question.service';
import { Component, OnInit } from '@angular/core';
import { QuestionListModel } from '@app/models/question/questionListModel';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questionListModel:QuestionListModel[];
  constructor(private questionService:QuestionService,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.getQuestions();
  }
  getQuestions(){
    this.questionService.getList().subscribe((result)=>{
      this.questionListModel=result.data;
    },(error)=>this.alertifyService.error(error))
  }
}
