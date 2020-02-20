import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    const group: any = {};

    questions.forEach(question => {
      const questionValidators = [];
      if (question.required) {

        questionValidators.push(Validators.required);
      }
      if (question.maxLength) {
        questionValidators.push(Validators.maxLength(question.maxLength));
      }
      group[question.key] = new FormControl(question.value || '', questionValidators);

    });
    return new FormGroup(group);
  }
}
