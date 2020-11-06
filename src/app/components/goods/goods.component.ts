import { Component, OnInit } from '@angular/core';
import {DbService} from '../../servise/db.service';
import {Product} from '../../interface/interface';
import {TradeService} from '../../servise/trade.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  product: Product[];
  constructor(
    private getProduct: DbService,
    private buy: TradeService)
  { }

  ngOnInit(): void {
    this.getProduct.getJSON().subscribe(data => {
      this.product = data;
        // tslint:disable-next-line:prefer-for-of
      let i = 0;
      for (i = 0; i < this.product.length; i++) {
          this.product[i].value = 1;
          this.product[i].amountPrice = this.product[i].priceRetailAlt;
          this.product[i].amountPriceGold = this.product[i].priceGoldAlt;
        }
    },
      error => {
      console.log(error);
      });
  }

  metr(event: Product) {
    event.amountPrice = event.value * event.priceRetailAlt;
    event.amountPriceGold = event.value * event.priceGoldAlt;
    console.log(event);
  }

  package(event: Product) {
    event.amountPrice = event.value * event.priceRetail;
    event.amountPriceGold = event.value * event.priceGold;
  }

  plus(event: Product){
    event.value = event.value + 1;
    if (event.isActive) {
      this.metr(event);
    } else {
      this.package(event);
    }
  }

  minus(event) {
    event.value = event.value - 1;
    if (event.value < 1) {
      event.value = 1;
    } else {
      if (event.isActive) {
        this.metr(event);
      } else {
        this.package(event);
      }
    }
  }

  buyProduct(event) {
    this.buy.tradePut(event).subscribe();
  }
}
