import { Component, OnInit } from '@angular/core';
import { MainResultModel } from '@app/models/main/mainResultModel';
import { AlertifyService } from '@app/services/alertify.service';
import { MainService } from '@app/services/main.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  mainResultModel:MainResultModel;
  constructor(private mainService:MainService,private alertifyService:AlertifyService) { }

  ngOnInit(): void {
    this.getMainResultModel();
  }
  getMainResultModel(){
    this.mainService.getMains().subscribe((result)=>{
      this.mainResultModel=result.data;
    },(error)=>this.alertifyService.error(error));
  }

}
