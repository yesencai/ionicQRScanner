import {Component, style} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {variable} from "../../util/globalVariable";
import {isBlank} from "ionic-angular/umd/util/util";
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  //控制连扫按钮选中颜色
  public isSelect:boolean=false;
  public noSelect:boolean=true;

  //控制摄像头按钮选中颜色
  public cameraIsSelect:boolean=false;
  public cameraNoSelect:boolean=true;

  //控制闪光灯按钮选中颜色
  public flashIsSelect:boolean=false;
  public flashNoSelect:boolean=true;

  public count:any=0;
  public result:string="";
  light: boolean;//判断闪光灯
  frontCamera: boolean;//判断摄像头
  constructor(public navCtrl: NavController, public navParams: NavParams,private qrScanner: QRScanner,private viewCtrl: ViewController) {
    //默认为false
    this.light = false;
    this.frontCamera = false;
  }

  //页面加载完就显示扫描界面
  ionViewDidLoad() {
    this.scanning();
  }


//扫描方法
  scanning(){
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.vibration();           //设置振动
            console.log("scanData",variable.scanData);
            if(!variable.isSweep){     //不连扫的情况,将数据赋值给scanTxt
              this.qrScanner.hide(); // 隐藏相机预览
              scanSub.unsubscribe(); // 停止扫描
              this.navCtrl.pop();     //退出扫描界面
              variable.scanTxt=text;
            }else{                    //连扫,追加数据到list列表中
              if(text!=undefined && text!=""&& text!=null){
                variable.scanData=variable.scanData.concat(text);
              }
              this.scanning();
            }
          });
          this.qrScanner.show();
        } else if (status.denied) {
        } else {
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  //开始扫描,主要用作连扫
  startScanning(){
    this.qrScanner.getStatus().then((status: QRScannerStatus)=>{
      if (status.authorized) {
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          if (text != undefined && text != "" && text != null) {
            variable.scanData = variable.scanData.concat(text);
          }
          this.vibration();           //设置振动
          console.log("scanData", variable.scanData);
          if (variable.isSweep) {
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.navCtrl.pop();
          }
        });
      }
    }).catch((e: any) => console.log('Error is', e));
  }

  //振动
  vibration() {
    var time = 1000;
    navigator.vibrate(time);
  }

    //连扫调用方法
    sweepScam(){
      variable.isSweep=!variable.isSweep;
    }

  //页面可见时才执行
  ionViewDidEnter(){
    this.showCamera();
  }

  /**
   * 闪光灯控制，默认关闭
   */
  toggleLight() {
    this.flashIsSelect=!this.flashIsSelect;
    this.flashNoSelect=!this.flashNoSelect;
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }


  /**
   * 前后摄像头互换
   */
  toggleCamera() {
    this.cameraIsSelect=!this.cameraIsSelect;
    this.cameraNoSelect=!this.cameraNoSelect;
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }

  //显示扫描界面方法
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  //隐藏相机预览界面
  hideCamera() {
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewWillLeave() {
    this.hideCamera();
  }

  changeStyle() {
   this.isSelect=!this.isSelect;
   this.noSelect=!this.noSelect;
   variable.isSweep=!variable.isSweep;
  }

}
