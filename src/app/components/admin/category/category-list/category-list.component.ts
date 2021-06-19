import { AlertifyService } from '@app/services/alertify.service';
import { CategoryListModel } from '@app/models/category/categoryListModel';
import { CategoryService } from '@app/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categoryListModel: CategoryListModel[];
  constructor(
    private categoryService: CategoryService,
    private alertifyService: AlertifyService
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
}
