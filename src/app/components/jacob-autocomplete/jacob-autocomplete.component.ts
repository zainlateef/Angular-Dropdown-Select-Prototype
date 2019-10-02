// import {Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, SimpleChanges} from '@angular/core';
// import {FloatLabelType} from "@angular/material/core";
// import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
// import {SearchResults} from "../../../search/domain/search-results";
// import {UtilService} from "../../../util/service/util.service";
// import {BaseInputComponent} from "../base-input/base-input-component";
//
// @Component({
//   selector: 'ic-autocomplete',
//   templateUrl: './autocomplete.component.html',
//   styleUrls: ['./autocomplete.component.scss']
// })
// export class AutocompleteComponent extends BaseInputComponent implements OnInit, OnChanges {
//
//   @ContentChild('option')
//   optionTemplate: TemplateRef<any>;
//
//   @Input()
//   type: string;
//
//   @Input()
//   maxLength: string;
//
//   @Input()
//   options: any;
//
//   @Input()
//   floatLabel: FloatLabelType;
//
//   @Input()
//   searchFunction: (filter: any, id: any) => Promise<SearchResults<any>>;
//
//   @Input()
//   displayFunction: (option: any) => string;
//
//   @Input()
//   valueFunction: (option: any) => any;
//
//   @Input()
//   wgrModel: any;
//
//   @Output()
//   wgrModelChange: EventEmitter<any> = new EventEmitter<any>();
//
//   filteredOptions: any;
//
//   storedOptions: any;
//
//   inputAutocomplete: string = 'off';
//
//   filterValue: string;
//
//   constructor(private utilService: UtilService) {
//     super();
//   }
//
//   ngOnInit() {
//     if (this.wgrModel) {
//       this.fetchFilteredOptions(null, this.wgrModel).then((results: any) => {
//         this.filterValue = results && results.length > 0 ? results[0].display : null;
//       });
//     }
//   }
//
//   ngOnChanges(changes: SimpleChanges): void {
//     if (!changes.wgrModel.currentValue) {
//       this.filterValue = null;
//     }
//   }
//
//   changeFilter(focus: boolean) {
//     if (!this.filterValue && !focus) {
//       this.updateWgrModel(null);
//     }
//
//     if (this.searchFunction) {
//       this.fetchFilteredOptions(this.filterValue, null);
//     } else {
//       this.filteredOptions = this.options;
//     }
//   }
//
//   fetchFilteredOptions(filter: any, id: any) {
//     this.filteredOptions = this.searchFunction(this.filterValue, id).then((searchResults: SearchResults<any>) => {
//       this.storedOptions = [];
//
//       for (let result of searchResults.results) {
//         this.storedOptions.push({
//           display: result,
//           value: this.valueFunction ? this.valueFunction(result) : result
//         });
//       }
//
//       return this.storedOptions;
//     });
//
//     return this.filteredOptions;
//   }
//
//   clearFilter() {
//     this.filterValue = this.wgrModel;
//   }
//
//   displayWith = (value: any) => {
//     let selectedOption = value;
//
//     if (this.storedOptions) {
//       for (let option of this.storedOptions) {
//         if (option.value === value) {
//           selectedOption = option.display;
//           break;
//         }
//       }
//     }
//
//     if (this.displayFunction) {
//       return this.displayFunction(selectedOption);
//     } else {
//       return value;
//     }
//   };
//
//   updateSelection(selected: MatAutocompleteSelectedEvent): void {
//     this.updateWgrModel(selected.option.value);
//   }
//
//   updateWgrModel(value: any) {
//     if (!this.utilService.equals(value, this.wgrModel)) {
//       this.wgrModel = value;
//       this.wgrModelChange.emit(this.wgrModel);
//     }
//   }
//
//
// }
