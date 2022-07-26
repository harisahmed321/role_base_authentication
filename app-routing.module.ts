import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserAddEditComponent } from './components/user-add-edit/user-add-edit.component';
import { UsersComponent } from './components/users/users.component';
import {
  AuthGuard,
  AuthGuardAdmin,
  AuthGuardUser,
} from './services/core/auth.guard';
import { McqGroupComponent } from './components/mcq-group/mcq-group.component';
import { McqGroupEditComponent } from './components/mcq-group-edit/mcq-group-edit.component';
import { McqQuestionEditComponent } from './components/mcq-question-edit/mcq-question-edit.component';
import { InvitationsComponent } from './components/invitations/invitations.component';
import { SendInvitationComponent } from './components/send-invitation/send-invitation.component';
import { StudentTestComponent } from './components/student-test/student-test.component';
import { StudentRecordsComponent } from './components/student-records/student-records.component';
import { StudentRecordComponent } from './components/student-record/student-record.component';
import { UserType } from './shared/enum';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'mcq-groups' },
      {
        path: 'mcq-groups',
        component: McqGroupComponent,
      },
      {
        path: 'mcq-groups/:id',
        component: McqGroupEditComponent,
        canActivate: [AuthGuardAdmin],
        data: { role: UserType.ADMIN },
      },
      {
        path: 'mcq-questions/:mCQGroupId/:id',
        component: McqQuestionEditComponent,
        canActivate: [AuthGuardAdmin],
        data: { role: UserType.ADMIN },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuardUser],
        data: { role: UserType.USER },
      },
      {
        path: 'users/:id',
        component: UserAddEditComponent,
        canActivate: [AuthGuardUser],
        data: { role: UserType.USER },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'student-test/:testLink',
    component: StudentTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
