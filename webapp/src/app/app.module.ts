import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InputFileComponent } from './input-file/input-file.component';



// Angular material stuff
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatToolbarModule, MatButtonModule,
        MatCardModule, MatInputModule, MatFormFieldModule, MatListModule, MatIconModule, MatTableModule } from '@angular/material';
import { UploadComponent } from './upload/upload.component';

const appRoutes: Routes = [
    { path: '', component: UploadComponent},
    { path: 'results', component: ResultsComponent},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    PageNotFoundComponent,
    UploadComponent,
    InputFileComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTableModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
