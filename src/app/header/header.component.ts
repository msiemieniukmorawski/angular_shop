import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { ProductService } from '../product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  basketproduct: number
  closeResult: string;
  productsID: string[];
  products: any;

  constructor(private productService: ProductService, private basketService: BasketService, private modalService: NgbModal) { }

  ngOnInit() {
    this.basketService.getBasket().then((response) => {
      if (response.IdProduct.length !== 0){
        this.basketproduct = Array.from(new Set(response.IdProduct)).length;
        this.productsID = Array.from(new Set(response.IdProduct));
        this.getItem(this.productsID, response.IdProduct);

      }
      else{
        this.basketproduct = 0;
      }
    })
  }

  async getItem(productsID, allItem){
    const products = []
    for  (let i = 0; i < productsID.length; i++) {
      const element = productsID[i];
       await this.productService.getProductLisID(element).then((response) => {
        products.push(response);
      })
    }

    let count = {};
    allItem.forEach((i) => { count[i] = (count[i] || 0) + 1; });
    const temp = await products.map((item, index)=>{
      if (item._id in count){
        item.quantity = count[item._id]
      }
      return item
    })

    return this.products = temp;
  }

  removeFromBasket(ID){
    this.basketService.removeFromBasket(ID)
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
