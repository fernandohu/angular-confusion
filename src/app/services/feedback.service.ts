import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/feedback';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback) {
    let feedbackRepository = this.restangular.all('feedback');
    feedbackRepository.post(feedback);
  }
}
