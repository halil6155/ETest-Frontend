import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from '@app/services/alertify.service';
import { CategorySingleModel } from '@app/models/category/categorySingleModel';
import { CategoryService } from '@app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  categorySingleModel:CategorySingleModel;
  categoryUpdateFormGroup:FormGroup;
  constructor(private alertfiyService:AlertifyService,private router:Router,private activatedRoute:ActivatedRoute,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
    this.createFormGroup();
  }
  get getControls()
  { 
    return this.categoryUpdateFormGroup.controls;
  } 
  createFormGroup(){
    this.categoryUpdateFormGroup=new FormGroup({
      id:new FormControl(this.categorySingleModel.id,Validators.required),
      name:new FormControl(this.categorySingleModel.name,[Validators.required,Validators.maxLength(50),Validators.minLength(5)]),
      description:new FormControl(this.categorySingleModel.description,Validators.maxLength(100))
    })
  }
  getCategory(){
    this.activatedRoute.data.subscribe(result=>{
      this.categorySingleModel=result.data.data;
  
    })
  }
  update(){
    if(this.categoryUpdateFormGroup.valid){
      this.categoryService.update(this.categoryUpdateFormGroup.value)
      .subscribe(()=>{
       
         this.alertfiyService.success('Kategori Güncellendi!');
         this.router.navigateByUrl('/admin/category-list');
       
      },(error)=>this.alertfiyService.error(error));
    }
  }
}
