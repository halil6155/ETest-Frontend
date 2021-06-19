import { AlertifyService } from '@app/services/alertify.service';
import { CategoryService } from '@app/services/category.service';
import { ValidationService } from '@app/services/validation.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryAddFormGroup:FormGroup;
  constructor(private router:Router,private alertifyService:AlertifyService,public validationService:ValidationService,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }
  get getControls()
  { 
    return this.categoryAddFormGroup.controls;
  } 
  createFormGroup(){
    this.categoryAddFormGroup=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.maxLength(50),Validators.minLength(5)]),
      description:new FormControl('',Validators.maxLength(100))
    })
  }
  add(){
    if(this.categoryAddFormGroup.valid){
      this.categoryService.add(this.categoryAddFormGroup.value).subscribe(result=>{
        this.alertifyService.success('Kayıt Eklendi!');
        this.router.navigateByUrl('/admin/category-list');
      },(error)=>this.alertifyService.error(error))
    }
  }
}
