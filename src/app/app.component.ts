import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api/api.service';
import {SelectedItemService} from './store/selected-item/services/selected-item/selected-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'files-tree';

  fileTreeData;
  selectedItem;

  constructor(
    private apiService: ApiService,
    private slectedItemService: SelectedItemService
  ) {
  }

  ngOnInit(): void {
    this.apiService.getFileTree().subscribe((data: any) => {
      if (data && data.length) {
        this.fileTreeData = {};
        for (const item of data) {
          this.fileTreeData[item.id] = item;
        }
        for (const key in this.fileTreeData) {
          const item = this.fileTreeData[key];
          if (item.parentFileId) {
            if (this.fileTreeData[item.parentFileId]) {
              if (!this.fileTreeData[item.parentFileId].childrens) {
                this.fileTreeData[item.parentFileId].childrens = [];
              }
              this.fileTreeData[item.parentFileId].childrens.push(item);
            }
          }
        }
        for (const key in this.fileTreeData) {
          const item = this.fileTreeData[key];
          if (item.parentFileId) {
            delete this.fileTreeData[key];
          }
        }
        this.fileTreeData = {
          name: 'aaa',
          childrens: Object.values(this.fileTreeData)
        };
        console.log('this.fileTreeData', this.fileTreeData);
      }
    });
    this.slectedItemService.getSelectedItem().subscribe(
      (selectedItem => {
        this.selectedItem = selectedItem;
      }));
  }
}
