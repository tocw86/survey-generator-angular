
export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  activePage: number;
  activePageOnClick: number;
  controlType: string;
  showIf: any;
  longValuesLabels?: boolean;
  header?: string;
  maxLength: number;
  content?: string;
  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      activePage?: number,
      activePageOnClick?: number;
      controlType?: string,
      showIf?: any,
      header?: string,
      longValuesLabels?: boolean,
      maxLength?: number,
      content?: string
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';

    if (options.required) {
    this.required = true;
    }

    if (options.maxLength) {
    this.maxLength = options.maxLength;
    }

    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.showIf = options.showIf || false;
    this.activePage = options.activePage;
    this.activePageOnClick = options.activePageOnClick || null;
    this.content = options.content || null;
    this.header = options.header || null;
    this.longValuesLabels = options.longValuesLabels || false;
  }

  isVisible(form: any) {
    if (this.showIf && this.showIf.key && this.showIf.eq) {
      const flag = this.showIf.eq.includes(parseInt(form.get(this.showIf.key).value));
      // clear when form input is hidden
      if (!flag) {
      form.get(this.key).value = '';
      }
      return flag;
   } else {
     return true;
   }
  }
}
