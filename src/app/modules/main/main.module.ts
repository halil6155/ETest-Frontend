import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditResolve } from '@app/resolves/profile-edit.resolve';
import { CategoryUpdateResolve } from '@app/resolves/category-update.resolve';
import { QuestionUpdateResolve } from '@app/resolves/question-update.resolve';
import { LoginGuard } from '@app/guards/login.guard';
import { AdminGuard } from '@app/guards/admin.guard';
import { OperationClaimResolve } from '@app/resolves/operation-claim.resolve';
import { UserOperationClaimUpdateResolve } from '@app/resolves/user-operation-claim-update.resolve';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainLayoutComponent } from '@app/components/layout/main-layout/main-layout.component';
import { MainNavbarComponent } from '@app/components/navbar/main-navbar/main-navbar.component';
import { RegisterComponent } from '@app/components/register/register.component';
import { LoginComponent } from '@app/components/login/login.component';
import { AdminNavbarComponent } from '@app/components/navbar/admin-navbar/admin-navbar.component';
import { AdminLayoutComponent } from '@app/components/layout/admin-layout/admin-layout.component';
import { CategoryAddComponent } from '@app/components/admin/category/category-add/category-add.component';
import { CategoryListComponent } from '@app/components/admin/category/category-list/category-list.component';
import { CategoryUpdateComponent } from '@app/components/admin/category/category-update/category-update.component';
import { QuestionAddComponent } from '@app/components/admin/question/question-add/question-add.component';
import { QuestionUpdateComponent } from '@app/components/admin/question/question-update/question-update.component';
import { OperationClaimAddComponent } from '@app/components/admin/operation-claim/operation-claim-add/operation-claim-add.component';
import { UserListComponent } from '@app/components/admin/user/user-list/user-list.component';
import { UserOperationClaimComponent } from '@app/components/admin/user/user-operation-claim/user-operation-claim.component';
import { ProfileEditComponent } from '@app/components/profile-edit/profile-edit.component';
import { OperationClaimListComponent } from '@app/components/admin/operation-claim/operation-claim-list/operation-claim-list.component';
import { QuestionListComponent } from '@app/components/admin/question/question-list/question-list.component';
import { HomeComponent } from '@app/components/home/home.component';
import { OptionComponent } from '@app/components/partials/option/option.component';
import { UserAnswerResultComponent } from '@app/components/user-answer-result/user-answer-result.component';
import { OperationClaimUpdateComponent } from '@app/components/admin/operation-claim/operation-claim-update/operation-claim-update.component';
import { QuestionResultComponent } from '@app/components/question-result/question-result.component';
import { NotFoundComponent } from '@app/components/not-found/not-found.component';
import { AdminHomeComponent } from '@app/components/admin/admin-home/admin-home.component';
import { CardComponent } from '@app/components/admin/partials/card/card.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';



@NgModule({
  declarations: [
    MainLayoutComponent,
    MainNavbarComponent,
    RegisterComponent,
    LoginComponent,
    AdminNavbarComponent,
    AdminLayoutComponent,
    CategoryAddComponent,
    CategoryListComponent,
    CategoryUpdateComponent,
    QuestionAddComponent,
    QuestionUpdateComponent, QuestionListComponent, HomeComponent, OptionComponent, UserAnswerResultComponent,
    OperationClaimAddComponent, OperationClaimListComponent, OperationClaimUpdateComponent,
    UserListComponent,
    UserOperationClaimComponent,
    ProfileEditComponent,
    QuestionResultComponent,
    NotFoundComponent,
    AdminHomeComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
 
  ]
  ,providers:[
    ProfileEditResolve, LoginGuard, AdminGuard,
    CategoryUpdateResolve, QuestionUpdateResolve, OperationClaimResolve, UserOperationClaimUpdateResolve,
  ]
})
export class MainModule { }
