import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemService {

  private selectedItem = new BehaviorSubject(undefined);

  constructor() {
  }

  setSelectedItem(selectedItem) {
    this.selectedItem.next(selectedItem);
  }

  getSelectedItem() {
    return this.selectedItem;
  }

}
