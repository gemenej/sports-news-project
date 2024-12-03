import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  isAuthenticated$ = this.authService.isAuthenticated();
  currentUser$ = this.authService.getCurrentUser();
  title = "Service News Portal";

  constructor(
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuthenticated$.subscribe((value) => {
      //console.log("isAuthenticated$", value)
    });
    this.currentUser$.subscribe((user) => {
      //console.log("currentUser$", user);
    });
  }

  logout() {
    this.authService.logout().subscribe({
      error: (error) => {
        console.error("Logout failed:", error);
      },
    });
  }
}
