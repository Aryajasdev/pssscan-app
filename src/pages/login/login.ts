import { LocationService } from './../../services/location-service';
import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {UserService} from '../../services/user-service';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
  })
  export class LoginPage {
    public userid:string;
    public user:any;
    public err:string;
    public res:any;

    constructor(public nav: NavController, public US: UserService, private geo: Geolocation, private ls: LocationService) {
      localStorage.setItem("userId", "0");
      localStorage.setItem("userName", "unknown");
      localStorage.setItem("latitude", "0");            
      localStorage.setItem("longitude", "0");  
      this.setlocation();
    }

    setlocation(){
      this.getCurruntLocation().then(res => this.savelatlong(res.coords));
    }   

    savelatlong(res){ 
      localStorage.setItem("latitude", res.latitude.toString());            
      localStorage.setItem("longitude", res.longitude.toString());  
      this.ls.load();      
      this.res = res;      
    }

    getCurruntLocation(){
      return this.geo.getCurrentPosition();
    }

    login() {           
      this.US.getToken(this.userid).subscribe(
        data => localStorage.setItem("token", data),
        error => localStorage.setItem("token","")
      );
      
      this.US.getuser(this.userid).subscribe(
        user => this.user = this.getuserdata(user),
        error => this.err = <any>error);                         
    }  
    
    getuserdata(user){                
      localStorage.setItem("userId",user.userid);
      localStorage.setItem("userName", user.username);
      if(user.userid>0){
        this.nav.setRoot(HomePage);
      }
      return user;
    }
  }