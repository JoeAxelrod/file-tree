import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectedItemService} from '../../store/selected-item/services/selected-item/selected-item.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  animations: [
    trigger('slideToggle', [
      state('open', style({
        height: '*',
        overflow: 'auto'
      })),
      state('close', style({
        height: 0,
        overflow: 'hidden'
      })),
      transition('open => close', [
        animate('0.3s')
      ]),
      transition('close => open', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class FolderComponent implements OnInit {

  @Input() content;

  constructor(
    private selectedItemService: SelectedItemService
  ) { }

  ngOnInit() {
  }

  toggleFolder(folder) {
    if (folder.childrens && folder.childrens.length) {
      folder.isOpen = !folder.isOpen;
    }
  }

  editFolder(folder)  {
    folder.isEditMode = !folder.isEditMode;
  }

  createItem(selectedItem) {
    selectedItem.isOpen = true;
    this.selectedItemService.setSelectedItem(selectedItem);
    return false;
  }

}
