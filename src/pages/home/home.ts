import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {HttpClient} from '@angular/common/http';
import {HttpServiceProvider} from '../../providers/http-service/http-service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    time: string;

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                private qrScanner: QRScanner,
                private barcodeScanner: BarcodeScanner,
                private http: HttpClient,
                private hsp: HttpServiceProvider) {
        setInterval(function () {
            this.time = this.formatDate(new Date());
        }.bind(this), 1000);
    }

    registerTime(isStartTime) {
        const title = isStartTime ? '出勤打刻を行いました！' : '退勤打刻を行いました！';

        this.barcodeScanner.scan().then(barcodeData => {

            if (barcodeData.cancelled == true) {
                return;
            }

            this.hsp.getHoge(this.time, 'testPass').subscribe(json => {
                let alert = this.alertCtrl.create({
                    title: title + '<br>' + json,
                    subTitle: this.time,
                    buttons: ['OK']
                });
                alert.present();
            });

        }, (err) => {
            console.log('Error: ', err);
        });
    }

    formatDate(date) {
        return this.zeroPadding(date.getHours()) + ' : ' + this.zeroPadding(date.getMinutes()) + ' : ' + this.zeroPadding(date.getSeconds());
    }

    private zeroPadding(num) {
        return ('00' + num).slice(-2);
    }

}
