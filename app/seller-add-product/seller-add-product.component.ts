import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined;
  constructor(private product:ProductService){}

submit(data:product){
  if(data.name!="" && data.price!=null && data.color!="" && data.category!="" && data.description!="" && data.image!=""){
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addProductMessage="Product added successfully!!!"
      }
      setTimeout(() => (this.addProductMessage = undefined),3000)
    })
  } else {
    alert("Please fill the required fields")
  }
}

}
