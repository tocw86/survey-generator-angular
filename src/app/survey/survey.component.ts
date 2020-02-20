import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question/question.service';

@Component({
  selector: 'app-cleared',
  templateUrl: './survey.component.html',
  providers: [QuestionService]
})
export class SurveyComponent implements OnInit {
  questions?: any[];
  errorMessage?;
  constructor(private service: QuestionService) {

  }

 async ngOnInit() {
  this.getQuestions();
  }

 async getQuestions() {
    this.questions = await this.service.getQuestions();
    if(this.questions.length < 1){
      this.errorMessage = 'Brak ankiety do wypełnienia'
    }
  }
}
