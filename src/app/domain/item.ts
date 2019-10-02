import {SelectItem} from "./select-item";

export class Item implements SelectItem {
  constructor(private id: number, private name: string){}

  getDisplayText(): string {
    return this.name;
  }
}
