import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from '../_services/url.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  urlList:any=[];

  constructor(private urlService:UrlService,private router: Router) {
   
 
    
   }

  ngOnInit(): void {
    this.getAllLink();
    
  }

getAllLink(){
     this.urlService.getAllUrl().subscribe(
      (data) => {
        const res:any =data;
        this.urlList=res.shortUrls;
        console.log(this.urlList)
      },
      (error) => console.error
    ) 
  }
  addLink(fullUrl:any){
     this.urlService.AddUrl(fullUrl).subscribe(
      (data) => {
        const res:any =data;
        console.log(res);
        this.getAllLink();
      },
      (error) => console.error
    ) 
  }
  urlClicked(short:any){
    this.urlService.urlClicked(short).subscribe(
      (data) => {
        const res:any =data;
        console.log(res);
        this.getAllLink();
      },
      (error) => console.error
    ) 
  }
  

  logout(){
    localStorage.clear();
    this.router.navigate((['/login']))
  }
}
