import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rows: number[];
  columns: number[];
  data: string[] = [];
  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  };

  constructor() {
    this.rows = Array(7).fill(0).map((x, i) => i);
    this.columns = Array(7).fill(0).map((x, i) => i);
  }

  saveData($event: any) {
    const newCostumer = {
      costumer: {
        city: $event['CUSTOMER']['CITY'],
        street: $event['CUSTOMER']['STREET'],
        name: $event['CUSTOMER']['FIRSTNAME'],
        lastName: $event['CUSTOMER']['LASTNAME']
      },
    };
    this.data.push(JSON.stringify(newCostumer));
  }

  save() {
    if (this.data.length) {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'Report',
        text: JSON.stringify(this.data)
      });
    }
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }
}
