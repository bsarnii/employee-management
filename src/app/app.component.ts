import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureEditAmountComponent } from "./employee/feature-edit-amount/feature-edit-amount.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeatureEditAmountComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
