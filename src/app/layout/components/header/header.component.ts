import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {     
    this.authService.getStoreUser().subscribe(user => {
      if(user!=null) {
        this.isAuthenticated = true;
      }
    });
  }

  onLogout() {
    console.log(this.authService.isAuthenticated());
  }

}
