import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/feedback';
import { Observable } from "rxjs";

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    let feedbackRepository = this.restangular.all('feedback');
    return feedbackRepository.post(feedback);
  }
}
