import { Component } from '@angular/core';

@Component({
  selector: 'ch-root',
  templateUrl: './chapter2-root.component.html',
  styleUrls: ['./chapter2-root.component.css']
})
export class Chapter2RootComponent {
  serverElements = [{name: 'Test Server', type: 'server', content: 'Just a test server'}];

  onServerAdd(serverData: {name: string, content: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.name,
      content: serverData.content
    });
  }

  onBlueprintAdd(blueprintData: {name: string, content: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.name,
      content: blueprintData.content
    });
  }


}
