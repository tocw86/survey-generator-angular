import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../question/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Input() activePage: number;
  @Output() activePageChanged = new EventEmitter<number>();
  @Output() startSurveyChanged = new EventEmitter<boolean>();
  get isValid() { return this.form.controls[this.question.key].valid; }

  /**
   * Change page if has activePage
   * @param page number
   */
  showPage(page: number) {
    setTimeout(() => {
      this.activePageChanged.emit(page);
      this.startSurveyChanged.emit(true);
    },50);
  }

  /**
   * Get
   */
  getActivePage() {
    return this.activePage;
  }
}
