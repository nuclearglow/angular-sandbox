import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IsinControlComponent } from './components/isin-control/isin-control.component';
import { ReactiveEditorComponent } from './components/reactive-editor/reactive-editor.component';
import { IsinPipe } from './pipes/isin.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IsinPipe,
    ReactiveEditorComponent,
    IsinControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
      IsinPipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
