import { Component } from '@angular/core';
import { CorporationList } from './ui/corporation-list/corporation-list';

@Component({
  selector: 'app-dashboard.page',
  imports: [CorporationList],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage {}
