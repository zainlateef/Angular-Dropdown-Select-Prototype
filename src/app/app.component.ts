import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SelectItem} from "./domain/select-item";
import {Item} from "./domain/item";
import {Result} from "./domain/result";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genericStringArray: Array<string> = ['Generic', 'Strings','Lorem', 'Ipsum'];
  genericNumbersArray: Array<number> = [1,2,3,200];
  selectItemArray: Array<SelectItem> = [new Item(1,"Anaconda"),new Item(2,"Barbacoa"), new Item(3,"Anthropological Finding"),
    new Item(1,"Ganaconda"),new Item(2,"XBarbacoa"), new Item(3,"XAnthropological Finding")];
  dummySearchArray: Array<Result> = [
    new Result("Crocodile","https://via.placeholder.com/150"),
    new Result("Alligator", "https://via.placeholder.com/20" ),
    new Result("Big Bird", "https://via.placeholder.com/100"),
    new Result("Bald Guy", "https://via.placeholder.com/90"),
    new Result("Zebra", "https://via.placeholder.com/70")];
  searchResults: any;

  selectedGenericString: any;
  selectedItemObject: any;
  selectedCustomObject: any;
  selectedGenericNumber: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.search("star wars");
  }

  public async search(value) {
    this.searchResults = this.dummySearchArray.filter( object => object.title.includes(value));
  }

  stringify(selectedCustomObject: any) {
    return JSON.stringify(selectedCustomObject);
  }
}
