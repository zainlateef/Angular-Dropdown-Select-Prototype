import {SelectItem} from "./select-item";

export class Rating implements SelectItem{
  constructor(public Source: string, public Value: string){
  }

  getDisplayText(): string {
    return this.Source;
  }
}
