import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SelectItem} from "./domain/select-item";
import {Item} from "./domain/item";
import {Rating} from "./domain/rating";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genericStringArray: Array<string> = ['Generic', 'Strings','Lorem', 'Ipsum'];
  selectItemArray: Array<SelectItem> = [new Item(1,"Anaconda"),new Item(2,"Barbacoa"), new Item(3,"Anthropological Finding")];
  apiSearchResults: Array<Rating>;

  selectedGenericString: any;
  selectedItemObject: any;
  selectedCustomObject: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.parentSearch("star wars");
  }

  public async parentSearch(value) {
    let data = await this.http.get("http://www.omdbapi.com/?t="+ value +"&apikey=733c8b39").toPromise();
    this.apiSearchResults = data['Ratings'];
  }

  stringify(selectedCustomObject: any) {
    return JSON.stringify(selectedCustomObject);
  }
}
