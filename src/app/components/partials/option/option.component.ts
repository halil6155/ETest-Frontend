import { UserAnswerResultModel } from '@app/models/userAnswer/userAnswerResultModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryListModel } from '@app/models/category/categoryListModel';
import { CategoryService } from '@app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '@app/services/alertify.service';
import { QuestionService } from '@app/services/question.service';
import { AuthService } from '@app/services/auth.service';
import { QuestionSingleModel } from '@app/models/question/questionSingleModel';
import { UserAnswerService } from '@app/services/user-answer.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
})
export class OptionComponent implements OnInit {
  categoryListModel: CategoryListModel[];
  userAnswerResultModel:UserAnswerResultModel;
  categoryId: number;
  userAnswerFormGroup: FormGroup;
  questionSingleModel: QuestionSingleModel;
  constructor(
    private categoryService: CategoryService,
    private alertifyService: AlertifyService,
    private questionService: QuestionService,
    private userAnswerService: UserAnswerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getList().subscribe(
      (result) => {
        this.categoryListModel = result.data;
      },
      (error) => this.alertifyService.error(error)
    );
  }
  createFormGroup() {
    this.userAnswerFormGroup = new FormGroup({
      userId: new FormControl(this.authService.decodedTokenModel.nameid, [
        Validators.required,
      ]),
      questionId: new FormControl(-1, Validators.required),
      answer: new FormControl('?', Validators.required),
    });
  }
  changeAnswer(answer: string) {
    this.userAnswerFormGroup.patchValue({
      answer: answer,
    });
  }
  changeCategory(id: number) {
    this.categoryId = id;
    this.getQuestion();
  }
  getQuestion() {
    this.questionService
      .getUserAndCategoryId(
        this.authService.decodedTokenModel.nameid,
        this.categoryId
      )
      .subscribe(
        (result) => {
          this.questionSingleModel = result.data;
          this.createFormGroup();
          this.userAnswerFormGroup.patchValue({
            questionId: +this.questionSingleModel.id,
          });
        },
        () => {
          this.getResult();
        }
      );
  }
  getResult(){
    this.userAnswerService.getResult(this.authService.decodedTokenModel.nameid,this.categoryId).subscribe((result)=>{
      this.userAnswerResultModel=result.data;
      this.questionSingleModel=null;
    },()=>this.alertifyService.error('Veriler Yüklenemedi!Tekrar Deneyiniz...'));
  }
  sendAnswer() {
    if (this.userAnswerFormGroup.valid) {
      this.userAnswerService
        .add(this.userAnswerFormGroup.value)
        .subscribe(() => {
          this.getQuestion();
        });
    }
  }
}
