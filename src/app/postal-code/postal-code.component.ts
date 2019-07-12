import {Component, Input, OnInit} from '@angular/core';
import { PostalCodeService } from '../postal-code.service';
import { PostalData } from '../postal-data';

@Component({
  selector: 'app-postal-code',
  templateUrl: './postal-code.component.html',
  styleUrls: ['./postal-code.component.css']
})
export class PostalCodeComponent implements OnInit {
  data: PostalData;
  errMsg: string;


  constructor(private postalService: PostalCodeService ) { }

  valCode(code: string): void {
    this.errMsg = '';
    if (Number(code) === 0) {
      this.errMsg = 'No pueden ser letras y tiene que ser un numero mayor a 0';
      return;
    }
  }

  getData(code: number): void {
    if (!code) {
      this.errMsg = 'Es necesario ingresar un código de 5 números';
      return;
    }

    this.postalService.getData(code)
        .subscribe(data => this.data = data);
  }

  ngOnInit() {
  }


}
