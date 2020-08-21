import { MacSlideshowComponent } from './provisioning/mac-slideshow/mac-slideshow.component';
import { EasyLoadingSpinnerModule } from './loading-spinner/easy-loading-spinner.module';
import { DisplayDetector } from './display-detector.service';
import { NguiInViewModule } from './ngui-in-view/ngui-in-view.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TypingAnimationModule } from 'angular-typing-animation';
import { CompanyLocationMapComponent } from './company-location-map/company-location-map.component';
import { NavSectionDirective } from './navbar/nav-section.directive'
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    TypingAnimationModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NguiInViewModule,
    EasyLoadingSpinnerModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    CompanyLocationMapComponent,
    NavSectionDirective,
    MacSlideshowComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
