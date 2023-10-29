import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { StockComponent } from './stock/stock.component'; // Import the StockComponent
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Set LoginComponent as the default route
  { path: 'stock-market', component: StockMarketComponent },
  { path: 'stock', component: StockComponent },
  { path: 'stock/:symbol', component: StockComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
