import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question/question-base';
import { QuestionControlService } from '../question/question-control.service';
import { SurveyService } from '../survey/survey.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  activePage = 1;
  finishSurvey = false;
  flashMessage;
  form: FormGroup;
  payLoad = '';
  startSurvey = false;
  allActivePages = [];
  errorsPerPage  = [];

  constructor(private qcs: QuestionControlService, private http: HttpClient, private surveyService: SurveyService) {

  }

  checkAllFormPage(activePage) {
    this.errorsPerPage[activePage] = [];
    // console.log(this.form);
    let flag = false;
    if (this.questions) {
      const inputToCheck = [];
      this.questions.forEach((item) => {
        if (item && item.activePage == activePage && item.required) {
          inputToCheck.push(item.key);
        }
      });
      if (inputToCheck) {
        inputToCheck.forEach((key) => {
          if (key && this.form.get(key).status != 'VALID') {
            setTimeout(() => {
              this.form.get(key).markAsDirty({onlySelf: true});
             }, 100);
            flag = true;
          }
        });
        return flag;
      } else {
        return false;
      }
    }
  }

  activePageChanged(e) {
    this.activePage = e;
  }

  startSurveyChanged(e) {
    this.startSurvey = e;
  }

  checkAndGo(page, activePage) {
   if (!this.checkAllFormPage(activePage)) {
        this.activePage += page;
        this.form.clearValidators();
   } else {
     setTimeout(() => {
      const el = document.getElementsByClassName('errorMessage');
      if (el && el[0]) {
         el[0].parentElement.scrollIntoView();
      }
     }, 300);
   }
  }

  getAllActivePages(questions: any) {
    if (questions) {
      questions.forEach(element => {
        if (element.activePage) {
          if (this.allActivePages.indexOf(element.activePage) === -1) {
            this.allActivePages.push(element.activePage);
          }
        }
      });
    }
  }

  ngOnInit() {
    this.getAllActivePages(this.questions);
    this.form = this.qcs.toFormGroup(this.questions);
  }

  /**
   * Submit
   */
  onSubmit() {
    if (!this.checkAllFormPage(3) && this.form.value) {
      this.surveyService.sendSurvey(this.form.value, () => {
        this.finishSurvey = true;
        this.flashMessage = 'Dziękujemy za poświęcony czas i wszystkie uwagi. Będziemy pracować nad dostosowaniem serwisu do Twoich oczekiwań.';
      });
    } else {
      return false;

    }

  }
}
