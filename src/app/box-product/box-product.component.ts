import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from '../basket.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-box-product',
  templateUrl: './box-product.component.html',
  styleUrls: ['./box-product.component.scss']
})
export class BoxProductComponent implements OnInit {
  closeResult: string;
  
  @Input() data;
  
  constructor(private basketService: BasketService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  addProduct(ID, product) {
    this.basketService.putProductToBasket({
      IdProduct: ID,
    });
    this.modalService.open(product, { ariaLabelledBy: 'modal-basic-title', }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    })
    setTimeout(() => {
      this.modalService.dismissAll()
    }, 1000);
  }
}
