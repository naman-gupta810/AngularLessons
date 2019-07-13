import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CanDeactivateComponent} from '../../can-deactivate-component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateComponent {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.allowEdit = +this.route.snapshot.queryParams['allowEdit'] === 1 ? true : false;
    this.route.queryParams.subscribe((params: Params) => {
      this.allowEdit = +params['allowEdit'] === 1 ? true : false;
    });
    console.log('Allow Edit ' + this.allowEdit);
    let loadServerId = 1;
    if (this.route.snapshot.params['id']) {
      loadServerId = +this.route.snapshot.params['id'];
    }
    this.route.params.subscribe((params: Params) => {
      loadServerId = +params['id'];
    });
    this.server = this.serversService.getServer(loadServerId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): (Observable<boolean> | Promise<boolean> | boolean) {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard changes');
    } else {
      return true;
    }
  }

}
