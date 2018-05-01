import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ProcessHttpmsgService {

  constructor() { }

  public extractData(res: Response) {
    let body = res.json();

    return body || {};
  }

}
