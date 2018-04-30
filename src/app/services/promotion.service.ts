import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';

@Injectable()
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(PROMOTIONS);
      }, 2000);
    });
  }

  getPromotion(id: number): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(PROMOTIONS.filter(promo => {
          return promo.id === id
        })[0]);
      }, 2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(PROMOTIONS.filter(promo => {
          return promo.featured
        })[0]);
      }, 2000);
    });
  }
}
