import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UtilToolProvider } from '../providers/util-tool/util-tool';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    QRScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilToolProvider
  ]
})
export class AppModule {}
