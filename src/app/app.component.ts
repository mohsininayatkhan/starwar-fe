import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Star Wars'; 
  
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.autLogin();
  }  
}