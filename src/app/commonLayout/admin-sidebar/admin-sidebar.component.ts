import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';

import { MENU_ITEMS } from '../admin-sidebar/menuItems';
import { ROLES } from '../admin-sidebar/roles';

@Component({
    selector: 'app-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
    user: any;
    userRoles = ROLES;
    menuItem = MENU_ITEMS;
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    isCustomerCollapsed = true;
    isEmployeeCollapsed = true;
    htmlImages = environment.htmlImages;
    @Output() collapsedEvent = new EventEmitter<boolean>();
    private opened = false;
    role: any;

    constructor(
        public router: Router,
        private commonService: CommonService,

    ) {
        this.commonService.profile().subscribe(
            (response: any) => {
                this.user = response.body;
                localStorage.setItem('user',this.user.role);
                this.role = this.user.role;
                this.menuItem = MENU_ITEMS.filter(item => this.userRoles[this.role].includes(item.title));
            },
            (error) => {
                this.router.navigate(['/']);
            });
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
            }
        });



        

    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';

    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }


    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
