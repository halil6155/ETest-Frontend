import { ValidationService } from '@app/services/validation.service';
import { QuestionService } from '@app/services/question.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from '@app/services/alertify.service';
import { CategoryService } from '@app/services/category.service';
import { CategoryListModel } from '@app/models/category/categoryListModel';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css'],
})
export class QuestionAddComponent implements OnInit {
  questionAddFormGroup: FormGroup;
  categoryListModel: CategoryListModel[];
  constructor(
    private categoryService: CategoryService,
    private alertifyService: AlertifyService,
    private questionService: QuestionService,
    private router:Router,
    private authService: AuthService,
    public validationService: ValidationService
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.getCategories();
  }
  get getControls() {
    return this.questionAddFormGroup.controls;
  }
  createFormGroup() {
    this.questionAddFormGroup = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(10),
      ]),
      optionA: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      optionB: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      optionC: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      optionD: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      answer: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      userId: new FormControl(1, [Validators.required]),
      categoryId: new FormControl(0, [Validators.required]),
    });
  }
  getCategories() {
    this.categoryService.getList().subscribe(
      (result) => {
        this.categoryListModel = result.data;
      },
      (error) => this.alertifyService.error(error)
    );
  }
  changeCategory(id: number) {
    this.questionAddFormGroup.patchValue({
      categoryId: +id
    });
  }
  add() {
    if (this.questionAddFormGroup.valid) {
      this.questionService.add(this.questionAddFormGroup.value).subscribe(
        () => { this.alertifyService.success('Kayıt Eklendi!'); this.router.navigateByUrl('/admin/question-list') },
        (error) => this.alertifyService.error(error)
      );
    }
  }
}
