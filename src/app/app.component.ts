import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ReactiveFormsModule, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'lift-up';


}
