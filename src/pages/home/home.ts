import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    time: string;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, private qrScanner: QRScanner) {
        setInterval(function () {
            this.time = this.formatDate(new Date());
        }.bind(this), 1000);
    }

    start() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // camera permission was granted


                    // start scanning
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        console.log('Scanned something', text);

                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                    });

                    // show camera preview
                    this.qrScanner.show();

                    // wait for user to scan something, then the observable callback will be called

                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));

        let alert = this.alertCtrl.create({
            title: '出勤打刻を行いました！',
            subTitle: this.time,
            buttons: ['OK']
        });
        alert.present();
    }

    end() {
        let alert = this.alertCtrl.create({
            title: '退勤打刻を行いました！',
            subTitle: this.time,
            buttons: ['OK']
        });
        alert.present();
    }

    formatDate(date) {
        return this.zeroPadding(date.getHours()) + ' : ' + this.zeroPadding(date.getMinutes()) + ' : ' + this.zeroPadding(date.getSeconds());
    }

    zeroPadding(num) {
        return ('00' + num).slice(-2);
    }

}
