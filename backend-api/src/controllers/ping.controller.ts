import {get} from '@loopback/rest';

export class PingController {
  @get('/ping')
  ping(): object {
    return {message: 'pong'};
  }
}
