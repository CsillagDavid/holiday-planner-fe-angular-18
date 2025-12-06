import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-user-menu-item',
    imports: [MatButtonModule, MatMenuModule],
    templateUrl: './user-menu-item.component.html',
    styleUrl: './user-menu-item.component.scss'
})
export class UserMenuItemComponent{
    userName = signal('');

    constructor(userService: UserService,
        private authService: AuthService
    ){
        userService.getUser().subscribe(
            resp => {
                this.userName.set(resp.displayName);
            }
        );
    }

    logout(){
        this.authService.logout();
    }
}
