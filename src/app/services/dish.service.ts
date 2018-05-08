import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from "rxjs";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { Http} from '@angular/http';

@Injectable()
export class DishService {

  constructor(private http: Http,
              private processHttpMsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
      .map(res => this.processHttpMsgService.extractData(res) )
      .catch(error => this.processHttpMsgService.handleError(error));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => this.processHttpMsgService.extractData(res))
      .catch(error => this.processHttpMsgService.handleError(error));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => this.processHttpMsgService.extractData(res)[0])
      .catch(error => this.processHttpMsgService.handleError(error));
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => dishes.map(dish => dish.id));
  }
}
