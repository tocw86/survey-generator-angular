import { QuestionBase } from './question-base';

export class RadioQuestion extends QuestionBase<string> {
  controlType = 'radio';
  type: string;
  values: {key: string, value: string}[] = [];
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.values = options['values'] || [];
  }
}
