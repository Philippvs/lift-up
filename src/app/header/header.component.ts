import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton} from "@angular/material/button";
import {color} from "echarts";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        MatToolbar,
        MatButton,
        MatAnchor,
        MatSlideToggle
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

    auth: AuthService = inject(AuthService);
    router: Router = inject(Router);
    _snackBar: MatSnackBar = inject(MatSnackBar);
    checked: boolean = false;
    protected readonly color = color;

    private randomMessages: string[] = [
        "Elevator broke down",
        "Squirrel ate a cable",
        "Earthquake!!!",
        "Low on lubricant",
        "Switch to emergency generator",
    ]

    logout() {

        this.auth.logout();
        this.router.navigateByUrl("/login");
    }

    openSnackBar() {
        this._snackBar.open(this.randomMessages[Math.floor(Math.random() * this.randomMessages.length)], "dismiss", {
            duration: 2500,
            panelClass: "background-red"
        });
    }

    ngOnInit(): void {
        setInterval(() => {
            console.log("intervall", this.checked)
            if (this.checked) {
                console.log("open snack bar")
                this.openSnackBar();
            }
        }, 5000)
    }
}
