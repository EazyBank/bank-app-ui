import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/model/user.model';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    user = new User();
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;

    constructor(private readonly keycloack: KeycloakService) {

    }

    async ngOnInit() {
        this.isLoggedIn = await this.keycloack.isLoggedIn();

        if (this.isLoggedIn) {
            this.userProfile = await this.keycloack.loadUserProfile();
            this.user.authStatus = 'AUTH';
            this.user.name = this.userProfile.firstName || '';
            window.sessionStorage.setItem("userdetails", JSON.stringify(this.user))
        }
    }

    login() {
        this.keycloack.login();
    }

    logout() {
        const redirectURI: string = "http://localhost:4200/home"
        this.keycloack.logout(redirectURI);
    }
}
