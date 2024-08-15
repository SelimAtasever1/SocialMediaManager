import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule for input fields
import { MatIconModule } from '@angular/material/icon';

// Taiga UI Modules
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

// Components
import { ButtonComponent } from './atoms/button/button.component';
import { InputFieldComponent } from './atoms/input-field/input-field.component';
import { LabelComponent } from './atoms/label/label.component';
import { IconComponent } from './atoms/icon/icon.component';
import { FormFieldComponent } from './molecules/form-field/form-field.component';
import { LinkCardComponent } from './molecules/link-card/link-card.component';
import { HeaderComponent } from './templates/header/header/header.component';
import { DataTableComponent } from './organisms/data-table/data-table.component';
import { LinkFormComponent } from './organisms/link-form/link-form/link-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoComponent } from './atoms/logo/logo.component';
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { UrlValidatorDirective } from './shared/directives/validate-social-media.directive';
import { AuthComponent } from './organisms/auth/auth.component';
/* import { AuthGuard } from './shared/guards/guards/auth.guard'; */


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    InputFieldComponent,
    LabelComponent,
    IconComponent,
    FormFieldComponent,
    LinkCardComponent,
    HeaderComponent,
    DataTableComponent,
    LinkFormComponent,
    LogoComponent,
    CapitalizePipe,
    UrlValidatorDirective,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    // Angular Material Modules
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, // Add MatInputModule

    // Taiga UI Modules
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
