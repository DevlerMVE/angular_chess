import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgxXml2jsonService} from 'ngx-xml2json';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit {
  @Input() item: any;
  @Output() dataEmitter = new EventEmitter<any>();
  city: string;
  street: string;
  name: string;
  lastName: string;

  private url: string;
  result: any;

  constructor(private httpClient: HttpClient, private ngxXml2jsonService: NgxXml2jsonService) {
  }

  ngOnInit() {
    this.url = 'http://www.thomas-bayer.com/sqlrest/CUSTOMER/';
  }

  clickEvent() {

    // this.httpClient
    //   .get(this.url, {
    //     headers: new HttpHeaders()
    //       .set('Content-Type', 'text/xml')
    //       .append('Access-Control-Allow-Origin', '*')
    //   })
    //   .subscribe(apiData => (this.result = apiData));

    this.result =
      '<CUSTOMER xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
      '<ID>0</ID>\n' +
      '<FIRSTNAME>Laura</FIRSTNAME>\n' +
      '<LASTNAME>Steel</LASTNAME>\n' +
      '<STREET>429 Seventh Av.</STREET>\n' +
      '<CITY>Dallas</CITY>\n' +
      '</CUSTOMER>';

    const parser = new DOMParser();
    const xml = parser.parseFromString(this.result, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    this.city = obj.CUSTOMER.CITY;
    this.street = obj.CUSTOMER.STREET;
    this.name = obj.CUSTOMER.FIRSTNAME;
    this.lastName = obj.CUSTOMER.LASTNAME;

    this.dataEmitter.emit(obj);

  }
}
