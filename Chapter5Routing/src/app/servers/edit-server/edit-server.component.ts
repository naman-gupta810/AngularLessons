import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('Allow Edit ' + this.route.snapshot.queryParams['allowEdit']);
    console.log('Is prod server ' + this.route.snapshot.queryParams['allowEdit']);
    console.log('This page fragment ' + this.route.snapshot.fragment);
    let loadServerId = 1;
    if (this.route.snapshot.params['id']) {
      loadServerId = +this.route.snapshot.params['id'];
    }
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
    this.server = this.serversService.getServer(loadServerId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
