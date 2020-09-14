import { Component, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated=false;

  constructor(private dataStorageService:DataStorageService,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user => {
      this.isAuthenticated= !!user;
      console.log(!user);
      console.log(!!user);
    }));
  }

  onLogout(){
    this.authService.logout();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
