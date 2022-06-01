import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryListComponent } from './library-list/library-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MeetingDetailsComponent } from './meeting/meeting-details/meeting-details.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { EventFormComponent } from './event-form/event-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/meetings', pathMatch: 'full' },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'meetings', component: MeetingListComponent },
  { path: 'meetings/new', component: EventFormComponent },
  { path: 'meetings/:id', component: MeetingDetailsComponent },
  { path: 'library', component: LibraryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
