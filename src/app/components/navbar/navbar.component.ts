import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { UserMenuItemComponent } from "./user-menu-item/user-menu-item.component";

export interface MenuItem {
    navTo: string;
    literal: string;
}

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, UserMenuItemComponent, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
    menuItems: MenuItem[] = [{
        literal: 'Home',
        navTo: '/'
    },
    {
        literal: 'Plans',
        navTo: '/plans'
    }];
    private route = inject(ActivatedRoute);

    constructor() {
    }

    onRouterLinkActive($event: any) {
    }
}
