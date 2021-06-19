import { AlertifyService } from '@app/services/alertify.service';
import { CategoryService } from '@app/services/category.service';
import { AuthService } from '@app/services/auth.service';
import { QuestionSingleModel } from '@app/models/question/questionSingleModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryListModel } from '@app/models/category/categoryListModel';
import { QuestionService } from '@app/services/question.service';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.css']
})
export class QuestionUpdateComponent implements OnInit {
  questionSingleModel:QuestionSingleModel;
  questionUpdateFormGroup: FormGroup;
  categoryListModel: CategoryListModel[];
  constructor(private router:Router,private questionService:QuestionService,private alertifyService:AlertifyService,private activatedRoute:ActivatedRoute,private authService:AuthService,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getQuestion();
    this.createFormGroup();
    this.getCategories();
  }
  getQuestion(){
    this.activatedRoute.data.subscribe((result)=>{
        this.questionSingleModel=result.data.data;
    })
  }
  changeCategory(id:number){
    this.questionUpdateFormGroup.patchValue({
     categoryId:+id
    });
   }
   get getControls() {
    return this.questionUpdateFormGroup.controls;
  }
  getCategories() {
    this.categoryService.getList().subscribe(
      (result) => {
        this.categoryListModel = result.data; 
      },
      (error) => this.alertifyService.error(error)
    );
  }
  createFormGroup(){
    this.questionUpdateFormGroup = new FormGroup({
      text: new FormControl(this.questionSingleModel.text, [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(10),
      ]),
      optionA: new FormControl(this.questionSingleModel.optionA, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      optionB: new FormControl(this.questionSingleModel.optionB, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      optionC: new FormControl(this.questionSingleModel.optionC, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      optionD: new FormControl(this.questionSingleModel.optionD, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      answer: new FormControl(this.questionSingleModel.answer, [
        Validators.required,
        Validators.maxLength(1),
      ]),
      userId: new FormControl(this.authService.decodedTokenModel?.nameid, [Validators.required]),
      categoryId: new FormControl(this.questionSingleModel.categoryId, [Validators.required]),
    });
  }
  update(){
    if (this.questionUpdateFormGroup.valid) {
      this.questionService.add(this.questionUpdateFormGroup.value).subscribe(
        () => {
          this.alertifyService.success('Kayıt Güncellendi!');
          this.router.navigateByUrl('/admin/question-list')
        },
        (error) => this.alertifyService.error(error)
      );
    }
  }
}
