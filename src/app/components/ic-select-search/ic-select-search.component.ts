import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Form, FormControl} from "@angular/forms";
import {FloatLabelType} from "@angular/material/core";
import {SelectItem} from "../../domain/select-item";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'ic-select-search',
  templateUrl: './ic-select-search.component.html',
  styleUrls: ['./ic-select-search.component.scss']
})
export class IcSelectSearchComponent implements OnInit {

  @Input()
  form: Form;

  @Input()
  type: string;

  @Input()
  errorKeys: string;

  @Input()
  floatLabel: FloatLabelType;

  @Input()
  name: string;

  @Input()
  required: boolean;

  @Input()
  disabled: boolean;

  @Input()
  placeholder: string;

  @Input()
  wgrModel: any;

  @Output()
  wgrModelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('optionTemplate')
  optionTemplate: TemplateRef<any>;

  @Output()
  inputEvent: EventEmitter<string> = new EventEmitter<string>();

  loading: boolean = false;

  @Input()
  set searchPromise(promise: Promise<any>) {
    this.loading = true;
    promise.then((data) => {
      this.options = data.results;
      this.loading = false;
    })
  }

  @Input()
  options: Array<any> = new Array<any>();

  genericOptions: Array<any>;

  @Input()
  displayKey: string = "name";

  @Input()
  panelWidth: string;

  @Input()
  divider: boolean = true;

  formControl = new FormControl();

  generic: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    if (this.inputEvent.observers.length < 1) {
      this.generic = true;
      this.genericOptions = this.options.slice(0);
    }
    this.formControl.setValue(this.wgrModel);
    this.formControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      if (this.isString(value)) {
        this.updateWgrModel(null);
        this.generic ? this.filterGenericOptions(value.toLowerCase()) : this.inputEvent.emit(value)
      }
    });
  }

  updateWgrModel(value: any): void {
    this.wgrModel = value;
    this.wgrModelChange.emit(this.wgrModel);
  }

  filterGenericOptions(value: string) {
    this.options = this.genericOptions.filter((option: any) => {
      if (!option) {
        return false;
      } else if (this.isSelectItem(option) && this.isString(option.getDisplayText())) {
        return option.getDisplayText().toLowerCase().includes(value);
      } else if (this.isString(option)) {
        return option.toLowerCase().includes(value);
      } else {
        return option.toString().includes(value);
      }
    });
  }

  //Get getDisplayText is a matautocomplete input, and must be an arrow function to scope correctly
  getDisplayText = (option: any) => {
    if (!option)
      return "";
    else if (this.isSelectItem(option))
      return option.getDisplayText();
    else if (this.generic)
      return option;
    else
      return option[this.displayKey];
  };

  isSelectItem(object: any): boolean {
    return object ? (object as SelectItem).getDisplayText !== undefined : false;
  }

  isString(object: any): boolean {
    return typeof object === "string";
  }

  clear() {
    this.formControl.setValue("");
    if (this.wgrModel) {
      this.updateWgrModel(null);
    }
  }

  onBlur(event) {
    if (!this.isMatOptionEvent(event) && !this.wgrModel) {
      this.formControl.setValue(null);
      this.loading = false;
    }
  }

  isMatOptionEvent(event): boolean {
    return event.relatedTarget && event.relatedTarget.id.indexOf('mat-option') > -1
  }

  showNull() {
    return this.options && this.options.length < 1 && !this.loading
  }

  showClear() {
    return this.formControl.value && !this.loading;
  }
}
