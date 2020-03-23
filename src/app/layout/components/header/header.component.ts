import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { Store} from '@ngrx/store';
import { AppState } from 'src/shared/store/states/app.state';
import * as AuthActions from 'src/shared/store/actions/auth.actions';
import { User } from 'src/shared/models/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private basePath : string;

  isAuthenticated = false;
  authUser: User = null;

  constructor(private store: Store<AppState>, private authService: AuthService) { }

  ngOnInit() {     
    this.authService.getStoreUser().subscribe(user => {
      this.authUser = user;
      this.isAuthenticated = false;
      if(this.authUser!=null) {
        this.isAuthenticated = true;        
      }
    });
  }

  onLogout() {    
    this.store.dispatch(new AuthActions.Logout());
  }
}
