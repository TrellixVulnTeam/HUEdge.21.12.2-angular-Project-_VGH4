import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesdetailService } from '../services/coursesdetail.service';

interface SingleCourseDetail{
  tags:[],
  details:string,
  description:string,
  discounted_price:string,
  actual_price:string,
  author:string,
  title:string,
  id:string
}

interface Courses{
  tags:[],
  details:string,
  description:string,
  discounted_price:string,
  actual_price:string,
  author:string,
  title:string,
  id:string
}

interface DeleteCourses{
  tags:[],
  details:string,
  description:string,
  discounted_price:string,
  actual_price:string,
  author:string,
  title:string,
  id:string
}

interface DeleteCart{
  tags:[],
  details:string,
  description:string,
  discounted_price:string,
  actual_price:string,
  author:string,
  title:string,
  id:string
}

export interface wishListCourses{
  tags:[],
  details:string,
  description:string,
  discounted_price:string,
  actual_price:string,
  author:string,
  title:string,
  id:string
}

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.component.html',
  styleUrls: ['./cartdetail.component.css']
})
export class CartdetailComponent implements OnInit {

  products: any = [];
  singleProduct: any = [];
  public searchInput:any=[];
  itemWishList = this.coursedetail.getWishListCourses();
  constructor(private coursedetail: CoursesdetailService,private httpClient: HttpClient,private router: Router ){}
  ngOnInit(): void {
    this.httpClient.get("../assets/coursesdetail.json").subscribe(data =>{
      console.log(data);
      this.products = data;
    })

    this.products = this.products.sort((low: { actual_price: number; }, high: { actual_price: number; }) => low.actual_price - high.actual_price);
  }

  addToCart(product:Courses){
    this.coursedetail.addToCart(product);

  }




  courseCount = this.coursedetail.getItems().length;

  item = this.coursedetail.getItems();

  getTotal() {
    let total = 0;
    for (var i = 0; i < this.item.length; i++) {
        if (this.item[i].actual_price) {
            total += parseInt(this.item[i].actual_price);

        }
    }
    return total;
}

getDiscountTotal() {
  let total = 0;
  for (var i = 0; i < this.item.length; i++) {
      if (this.item[i].discounted_price) {
          total += parseInt(this.item[i].discounted_price);

      }
  }
  return total;
}

addToWhishList(product:wishListCourses){
  this.coursedetail.addToWishList(product);

}

  showCourseDetail(singleProduct:SingleCourseDetail){
    this.coursedetail.showSingleCourse(singleProduct);
    this.router.navigate(['./course-detail']);
  }

  deleteCourse(coursedetail:DeleteCourses){
    this.coursedetail.deleteCourses(coursedetail);
    this.router.navigate(['./wishlist']);
  }

  checkoutCart(){
    this.coursedetail.checkoutCarts()
    this.router.navigate(['./cart-detail']);
  }

  deleteCart(product:DeleteCart){
    this.coursedetail.deleteCart(product);
    this.router.navigate(['./cart-detail']);
  }

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          this.products = this.products.sort((low: { actual_price: number; }, high: { actual_price: number; }) => low.actual_price - high.actual_price);
          break;
        }

      case "High":
        {
          this.products = this.products.sort((low: { actual_price: number; }, high: { actual_price: number; }) => high.actual_price - low.actual_price);
          break;
        }

      case "Name":
        {
          this.products = this.products.sort(function (low: { Name: number; }, high: { Name: number; }) {
            if (low.Name < high.Name) {
              return -1;
            }
            else if (low.Name > high.Name) {
              return 1;
            }
            else {
              return 0;
            }
          })
          break;
        }

      default: {
        this.products = this.products.sort((low: { Price: number; }, high: { Price: number; }) => low.Price - high.Price);
        break;
      }

    }
    return this.products;

  }

}
