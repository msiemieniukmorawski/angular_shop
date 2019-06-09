import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})

export class ProductListComponent implements OnInit {
  @Input() filter: string;
  products: any[]

  constructor(private pizzaService: ProductService) { }

  ngOnInit() {
    this.pizzaService.getProductList().then((response) => {

      switch (this.filter) {
        case 'featured':
        this.products = response.filter(item => item[this.filter]);
          break;
        case 'desktop':
          this.products = response.filter(item => item.category === 'desktop');
          break;
        
        case 'tablet':
          this.products = response.filter(item => item.category === 'tablet');
          break;
      
        default:
          break;
      }
    })
  }
 
}
