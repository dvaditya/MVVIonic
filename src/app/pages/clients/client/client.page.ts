import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../clients.service';
import { ClientModel } from 'src/app/shared/models/clients/client.model';
import { Helper } from 'src/app/shared/helpers/helper';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  public admissionId: string;
  public client: ClientModel = new ClientModel();
  public isPageLoading: boolean;

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              public helper: Helper) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isPageLoading = true;
    this.admissionId = this.route.snapshot.paramMap.get('id');
    this.getClient();
  }

  getClient() {
    this.clientService.getClient(this.admissionId).subscribe(
      (res: ClientModel) => {
        this.client = res;
        this.isPageLoading = false;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
