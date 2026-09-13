import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'booking/:tripId', component: BookingFormComponent },
  { path: 'confirmation/:pnr', component: ConfirmationComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
