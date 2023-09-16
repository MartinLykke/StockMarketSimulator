import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockMarketComponent } from './stock-market/stock-market.component';

const routes: Routes = [
  { path: '', redirectTo: '/stock-market', pathMatch: 'full' },
  { path: 'stock-market', component: StockMarketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
