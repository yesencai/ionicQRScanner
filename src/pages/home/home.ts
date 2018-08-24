import { Component,ChangeDetectorRef  } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ScanPage} from "../scan/scan";
import {variable} from "../../util/globalVariable";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public billCode:string="";
  public data:any=[];
  public isCheck:boolean=false;
  constructor(public navCtrl: NavController,public cd: ChangeDetectorRef) {
  }
  pushScan(){
    variable.isSweep=false;
    this.navCtrl.push("ScanPage");
  }
  //当将要进入页面时触发
  ionViewWillEnter(){
    this.data=variable.scanData;
    this.billCode=variable.scanTxt;
  }
}
