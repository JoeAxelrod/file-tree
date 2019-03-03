import {Component, Input, OnInit} from '@angular/core';
import {SelectedItemService} from '../../store/selected-item/services/selected-item/selected-item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  @Input() selectedItem;

  file;

  constructor(
    private selectedItemService: SelectedItemService
  ) { }

  ngOnInit() {
    this.file = {
      name: '',
      fileTypeId: 1
    };
  }

  createFile() {
    if (!this.selectedItem.childrens) {
      this.selectedItem.childrens = [];
    }
    this.selectedItem.childrens.push(this.file);
    this.selectedItemService.setSelectedItem(undefined);
  }

}
