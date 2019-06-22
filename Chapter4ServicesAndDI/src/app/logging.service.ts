
export class LoggingService {

  public logAccountStatusChanges(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
