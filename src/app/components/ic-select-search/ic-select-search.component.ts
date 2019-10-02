import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Input()
  wgrModel: any;

  @Output()
  wgrModelChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  inputEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  items: Array<any>;

  formControl = new FormControl();

  generic: boolean = false;

  genericFilteredOptions: Array<any>;

  constructor() {
  }

  ngOnInit(): void {
    if (this.inputEvent.observers.length < 1)
      this.generic = true;

    this.formControl.valueChanges.subscribe(value =>
    {
      if(this.isString(value)){
        this.updateWgrModel(null);
        value = value.toLowerCase();
        if (this.generic)
          this.genericFilterResults(value);
        else
          this.inputEvent.emit(value)
      }
    });
  }

  updateWgrModel(value: any): void {
    this.wgrModel = value;
    this.wgrModelChange.emit(this.wgrModel);
  }

  public genericFilterResults(value: string) {
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

  public getDisplayText(option: any): string {
    if(!option){
      return '';
    }
     else if (typeof option === "string") {
      return option;
    }
     else {
      return option.getDisplayText();
    }
  }

  isSelectItem(object: any): boolean {
    return (object as SelectItem).getDisplayText !== undefined;
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
