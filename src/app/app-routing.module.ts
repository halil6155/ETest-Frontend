import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { UserListComponent } from './components/admin/user/user-list/user-list.component';
import { OperationClaimAddComponent } from './components/admin/operation-claim/operation-claim-add/operation-claim-add.component';
import { UserAnswerResultComponent } from './components/user-answer-result/user-answer-result.component';
import { OptionComponent } from './components/partials/option/option.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryUpdateComponent } from './components/admin/category/category-update/category-update.component';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { CategoryAddComponent } from './components/admin/category/category-add/category-add.component';
import { CategoryListComponent } from './components/admin/category/category-list/category-list.component';
import { CategoryUpdateResolve } from './resolves/category-update.resolve';
import { QuestionAddComponent } from './components/admin/question/question-add/question-add.component';
import { QuestionUpdateResolve } from './resolves/question-update.resolve';
import { QuestionUpdateComponent } from './components/admin/question/question-update/question-update.component';
import { QuestionListComponent } from './components/admin/question/question-list/question-list.component';
import { LoginGuard } from './guards/login.guard';
import { OperationClaimListComponent } from './components/admin/operation-claim/operation-claim-list/operation-claim-list.component';
import { OperationClaimUpdateComponent } from './components/admin/operation-claim/operation-claim-update/operation-claim-update.component';
import { OperationClaimResolve } from './resolves/operation-claim.resolve';
import { UserOperationClaimComponent } from './components/admin/user/user-operation-claim/user-operation-claim.component';
import { UserOperationClaimUpdateResolve } from './resolves/user-operation-claim-update.resolve';
import { ProfileEditResolve } from './resolves/profile-edit.resolve';
import { QuestionResultComponent } from './components/question-result/question-result.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [

  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'main-results', component: QuestionResultComponent },
      { path: 'user-profile-edit/:id', component: ProfileEditComponent, canActivate: [LoginGuard], resolve: { data: ProfileEditResolve } },
      { path: 'questions', component: OptionComponent, canActivate: [LoginGuard] },
      { path: 'user-answer-result', component: UserAnswerResultComponent, canActivate: [LoginGuard] },
  
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent,canActivate:[AdminGuard], children: [
      { path: '', component: AdminHomeComponent },
      { path: "category-add", component: CategoryAddComponent },
      { path: "category-list", component: CategoryListComponent },
      { path: "question-add", component: QuestionAddComponent },
      { path: "question-list", component: QuestionListComponent },
      { path: "user-list", component: UserListComponent },
      { path: "operation-claim-add", component: OperationClaimAddComponent },
      { path: "operation-claim-list", component: OperationClaimListComponent },
      { path: "category-update/:id", component: CategoryUpdateComponent, resolve: { data: CategoryUpdateResolve } },
      { path: "user-operation-claim-list/:id", component: UserOperationClaimComponent, resolve: { data: UserOperationClaimUpdateResolve } },
      { path: "operation-claim-update/:id", component: OperationClaimUpdateComponent, resolve: { data: OperationClaimResolve } },
      { path: "question-update/:id", component: QuestionUpdateComponent, resolve: { data: QuestionUpdateResolve } },
 
    ]
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
