import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../basket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any
  closeResult: string;

  constructor(private productService: ProductService, private basketService: BasketService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getProductLisID(id).then((response) => {
      this.product = response
    })

  }

  addProduct(ID, product) {
    this.basketService.putProductToBasket({
      IdProduct: ID,
    });
    
    this.modalService.open(product, { ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });

    setTimeout(() => {
      this.modalService.dismissAll()
    }, 1000);
  }

}
