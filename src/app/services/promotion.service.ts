import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import { Observable } from "rxjs";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .map(promotions => promotions[0]);
  }
}
