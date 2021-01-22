import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from 'src/app/shared/models/clients/client.model';

@Injectable({
    providedIn: 'root'
})

export class ClientService {
    public clientList: ClientModel[];
    constructor(private http: HttpClient) {}

    getClients() {
        if(true) {
            const url = localStorage.getItem('api_url');
            return this.http.get<ClientModel[]>(`${url}api/clients/getClients`, {
                params: {
                accountId: '0',
                staffId: '0'
            }});
        } else {
            console.log('Network not available');
        }
    }

    getClient(admissionId) {
        if(true) {
            const url = localStorage.getItem('api_url');
            return this.http.get<ClientModel>(`${url}api/clients/getClient`, {
                params: {
                    admissionId
            }});
        } else {
            console.log('Network not available');
        }
    }
}
