import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSelectModule,
  MatSnackBarModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule, MatTreeModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { GroupProfileComponent } from './group-profile/group-profile.component';
import { GroupNamePromptComponent } from './group-name-prompt/group-name-prompt.component';
import { ChannelManagementComponent } from './channel-management/channel-management.component';
import { ChannelProfileComponent } from './channel-profile/channel-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserManagementComponent,
    UserProfileComponent,
    GroupManagementComponent,
    GroupProfileComponent,
    GroupNamePromptComponent,
    ChannelManagementComponent,
    ChannelProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTreeModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    UserProfileComponent,
    GroupProfileComponent,
    GroupNamePromptComponent,
    ChannelProfileComponent,
  ]
})

export class AppModule {}
