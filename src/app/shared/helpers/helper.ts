import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ScheduleModel } from '../models/schedules/schedule.model';

@Injectable({
    providedIn: 'root'
})
export class Helper {
    constructor(public platform: Platform) {}
    formatPhoneNumber(number: string) {
        if (number !== null && number !== undefined) {
            if (number.length === 10) {
                number = number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else {
                number = number.replace(/(\d{3})(\d{3})(\d{4})(\d+)?/, '($1) $2-$3 ext $4');
            }
            return number;
        }
        return '';
    }

    getAddressURL(entityObject) {
        if (this.platform.is('ios')) {
            if (!entityObject.address) {
                return '';
            }
            let iOSlink = 'https://maps.apple.com/?daddr=';
            const appleMapsaddress = entityObject.address.split(' ').join('+');
            iOSlink = iOSlink + appleMapsaddress + '+' + entityObject.city + '+' + entityObject.state;
            return iOSlink;
        } else {
            if (!entityObject.address) {
                return '';
            }
            let googleMapsLink = 'https://www.google.com/maps/dir/?api=1&destination=';
            const googleMapsAddress = entityObject.address.split(' ').join('+');
            googleMapsLink = googleMapsLink + googleMapsAddress + '+' + entityObject.city + '+' + entityObject.state;
            return googleMapsLink;
        }
    }

    getMobileOperatingSystem() {
        if (this.platform.is('android')) {
            return 'Android';
        } else if (this.platform.is('ios')) {
            return 'iOS';
        } else {
            return 'unknown';
        }
    }

    getStatusName(sch: ScheduleModel) {
        let statusName = '';
        if (sch.timeIn === null && sch.timeOut === null) {
           statusName = 'Pending';
        } else if (sch.timeIn !== null && sch.timeOut === null) {
           statusName = 'In Progress';
        } else if (sch.timeIn !== null && sch.timeOut !== null) {
           statusName = 'Completed';
        }
        return statusName;
    }

    getInitials(userName: string) {
        const nameParts = userName.split(' ');
        if (nameParts[0] !== undefined && nameParts[1] !== undefined) {
            return nameParts[0].substring(0, 1).toUpperCase() + nameParts[1].substring(0, 1).toUpperCase();
        } else if (nameParts[0] !== undefined && nameParts[1] === undefined) {
            return nameParts[0].substring(0, 1).toUpperCase() + '';
        } else {
            return '??';
        }
    }

    convertStringToColor(userName: string) {
        const nameParts = userName.split(' ');
        if (!nameParts[0]) {
            userName = '??';
        }

        let hash = 0;
        for (let i = 0; i < userName.length; i++) {
            hash = userName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();

        if (color.length > 3) {
            return '#' + '00000'.substring(0, 6 - color.length) + color;
        } else {
            return '#' + '000'.substring(0, 3 - color.length) + color;
        }
    }
}
