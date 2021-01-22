import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ErrorInterceptor } from './shared/helpers/auth-error.interceptor';
import { BasicAuthInterceptor } from './shared/helpers/auth.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddtasksComponent } from './modals/addtasks/addtasks.component';
import { MvvmodalsComponent } from './modals/mvvmodals/mvvmodals.component';

@NgModule({
  declarations: [AppComponent, AddtasksComponent, MvvmodalsComponent],
  entryComponents: [AddtasksComponent, MvvmodalsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(
      // {animated: false}
      ),
    IonicStorageModule.forRoot({
      name: '__medsys',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
