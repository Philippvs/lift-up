import {Component, inject} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton} from "@angular/material/button";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        MatToolbar,
        MatButton,
        MatAnchor
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

    auth: AuthService = inject(AuthService);
    router: Router = inject(Router);

    logout() {

        this.auth.logout();
        this.router.navigateByUrl("/login");
    }

}
