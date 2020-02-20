
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { SurveyService } from '../survey/survey.service';
import { QuestionBase } from './question-base';
import { RadioQuestion } from './question-radio';
import { TextareaQuestion } from './question-textarea';

@Injectable()
export class QuestionService {
  apiUrl: string;
  uuid: string;
  surveyId: string;

  constructor(private route: ActivatedRoute, private surveyService: SurveyService) {
    this.apiUrl = environment.apiUrl;
    this.uuid = route.snapshot.queryParamMap.get('uuid');
    this.surveyId = this.route.snapshot.params.surveyId;
  }

  async  getQuestions() {
    const questions: QuestionBase<any>[] = [];
    if (this.uuid) {
      const response = await this.surveyService.getSurvey(this.uuid, this.surveyId);
      if (response && response.survey) {
        this.surveyService.storeSurvey(response);
        response.survey.form.forEach(element => {
          switch (element.type) {
            case 'radio':
              questions.push(new RadioQuestion(element));
              break;
            case 'textarea':
              questions.push(new TextareaQuestion(element));
              break;
          }
        });
        return questions.sort((a, b) => a.order - b.order);
      }else{
        return [];
      }
    
    }
  }
}
