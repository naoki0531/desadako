import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    date: Date;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, private qrScanner: QRScanner, private barcodeScanner: BarcodeScanner, private http: HttpClient) {
        setInterval(function () {
            this.date = new Date();
        }.bind(this), 1000);
    }

    displayDate() {
        return typeof this.date !== 'undefined' ? this.zeroPadding(this.date.getHours()) + ' : ' + this.zeroPadding(this.date.getMinutes()) + ' : ' + this.zeroPadding(this.date.getSeconds()) : '';
    }

    formatDate() {
        return this.date.getFullYear() + '' + this.zeroPadding(this.date.getMonth() + 1) + '' + this.zeroPadding(this.date.getDate()) + '' + this.zeroPadding(this.date.getHours()) + '' + this.zeroPadding(this.date.getMinutes()) + '' + this.zeroPadding(this.date.getSeconds());
    }

    private zeroPadding(num:number) {
        return ('00' + num).slice(-2);
    }

    registerTime(isStartTime:boolean) {
        this.barcodeScanner.scan().then(barcodeData => {

            if (barcodeData.cancelled == true) {
                return;
            }

            this.attendances(isStartTime, barcodeData.text);

        }, (err) => {
            console.log('Error: ', err);
        });
    }

    attendances(isStartTime:boolean, uuid:string) {
        const params = {
            account_uuid: uuid,
            time: this.formatDate(),
            latitude: 56.757575,
            longitude: 139.131313,
            type: isStartTime ? 'attending' : 'leaving'
        };

        this.http.post('http://localhost:3000/attendances', params).subscribe(json => {
            let alert = this.alertCtrl.create({
                title: isStartTime ? '出勤打刻を行いました！' : '退勤打刻を行いました！',
                subTitle: this.displayDate(),
                buttons: ['OK']
            });
            alert.present();
        }, (err) => {
            console.log('Error: ', err);
        });
    }
}
