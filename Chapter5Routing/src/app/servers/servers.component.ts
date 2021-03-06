import {Component, OnInit} from '@angular/core';
import {ServersService} from './servers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: { id: number, name: string, status: string }[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  loadSyncServer(serverId: number) {
    this.router.navigate(['/servers', serverId, 'edit'],
      {
        queryParams: {allowEdit: 1, prodServer: false},
        fragment: 'loading'
      });
  }
}
