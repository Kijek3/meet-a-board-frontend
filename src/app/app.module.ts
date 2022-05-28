import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TieredMenuModule } from 'primeng/tieredmenu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { MeetingListComponent } from './meeting/meeting-list/meeting-list.component';
import { MeetingListItemComponent } from './meeting/meeting-list/meeting-list-item/meeting-list-item.component';
import { MeetingDetailsComponent } from './meeting/meeting-details/meeting-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UserSettingsComponent,
    MeetingListComponent,
    MeetingListItemComponent,
    MeetingDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    DividerModule,
    InputTextModule,
    MenubarModule,
    ToolbarModule,
    TieredMenuModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    PasswordModule,
    ProgressSpinnerModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
