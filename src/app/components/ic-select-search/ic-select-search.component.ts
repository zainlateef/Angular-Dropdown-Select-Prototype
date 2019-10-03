import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {filter, map, startWith} from "rxjs/operators";
import {SelectItem} from "../../domain/select-item";
import {Observable, of} from "rxjs";

@Component({
  selector: 'ic-select-search',
  templateUrl: './ic-select-search.component.html',
  styleUrls: ['./ic-select-search.component.scss']
})
export class IcSelectSearchComponent implements OnInit {

  @Input('option')
  optionTemplate: TemplateRef<any>;

  @Input()
  wgrModel: any;

  @Output()
  wgrModelChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  inputEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  items: Array<any>;

  @Input()
  secondaryText: any;

  @Input()
  displayWith : string;

  @Input()
  placeholder : string;

  @Input()
  panelWidth: string;

  formControl = new FormControl();

  generic: boolean = false;

  genericFilteredOptions: Array<any>;

  constructor() {
  }

  ngOnInit(): void {
    if (this.inputEvent.observers.length < 1) {
      this.generic = true;
    }

    this.formControl.valueChanges.subscribe(value =>
    {
      if(this.isString(value)){
        this.updateWgrModel(null);
        this.generic ? this.genericFilterResults(value.toLowerCase()) : this.inputEvent.emit(value)
      }
    });
  }

  updateWgrModel(value: any): void {
    this.wgrModel = value;
    this.wgrModelChange.emit(this.wgrModel);
  }

  genericFilterResults(value: string) {
    this.genericFilteredOptions = this.items.filter((option: any) => {
      if (this.isSelectItem(option) && option.getDisplayText()) {
        return option.getDisplayText().toLowerCase().includes(value);
      } else if (this.isString(option)) {
        return option.toLowerCase().includes(value);
      } else {
        return false;
      }
    });
  }

  //Arrow function necessary for matautocomplete displayWith input
  getDisplayText = (option: any) => {
    if(!option)
      return "";
    else if(this.displayWith)
      return option[this.displayWith];
    else if(this.isSelectItem(option))
      return option.getDisplayText();
    else if(this.isString(option))
      return option;
    else
      return '';
  };

  isSelectItem(object: any): boolean {
    return object ? (object as SelectItem).getDisplayText !== undefined : false;
  }

  isString(object: any): boolean {
    return typeof object === "string";
  }

  clear() {
    this.formControl.setValue("");
    if(this.wgrModel){
      this.updateWgrModel(null);
    }
  }

  onBlur(event) {
    if (!this.isMatOptionEvent(event) && !this.wgrModel) {
      this.formControl.setValue(null);
    }
  }

  isMatOptionEvent(event) : boolean {
    return event.relatedTarget && event.relatedTarget.id.indexOf('mat-option') > -1
  }
}
