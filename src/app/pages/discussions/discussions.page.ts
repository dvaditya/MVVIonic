import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DiscussionModel } from 'src/app/shared/models/discussions/discussion.model';
import { DiscussionService } from './discussion.service';
import { Helper } from 'src/app/shared/helpers/helper';
import { User } from '../../shared/models/auth/user.model';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.page.html',
  styleUrls: ['./discussions.page.scss'],
})
export class DiscussionsPage implements OnInit {
  public discussionsList: DiscussionModel[] = [];
  public currentUser: User;
  public isPageLoading: boolean;

  constructor(private authService: AuthService,
              public discussionService: DiscussionService,
              public helper: Helper) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isPageLoading = true;
    this.getDiscussionsList();
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  getDiscussionsList() {
    this.discussionService.getDiscussions(false).subscribe(
      (res: DiscussionModel[]) => {
        this.discussionsList = res;
        this.isPageLoading = false;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
