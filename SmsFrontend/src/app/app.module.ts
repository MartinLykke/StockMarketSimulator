import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import {HttpClientModule} from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'    // <--- this
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { StockComponent } from './stock/stock.component';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { LoginComponent } from './login/login.component';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';

@NgModule({
  declarations: [AppComponent, StockMarketComponent, StockComponent, LoginComponent, ToastNotificationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ApolloModule, FormsModule, CanvasJSAngularChartsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          link: httpLink.create({ uri: 'http://localhost:5157/graphql' }),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
