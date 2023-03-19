import { Component } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-foodtruck',
  templateUrl: './foodtruck.component.html',
  styleUrls: ['./foodtruck.component.css']
})
export class FoodtruckComponent {

  FoodTruck: any = [];
  EmployeeName: string = '';
  EmployeeId: string = '';
  orderConfirm: boolean = false;
  foodTruckName: string = '';
  location: string = '';
  foodName: string = '';
  foodPrice: string = '';
  menuConfirm: boolean = false;


  constructor(public restApi: RestApiService,) {
  }

  ngOnInit() {
    this.loadFoodTruck();
  }

  loadFoodTruck() {
      return this.restApi.getFoodTruck().subscribe((data: {}) => {
        this.FoodTruck = data;
        console.log(this.FoodTruck);
      });
  }

  placeOrder( item : any) {
      this.orderConfirm = false;
      let orderDetails = {
              foodTruckName: item.foodTruckName,
              foodName: item.foodName,
              foodPrice: item.foodPrice,
              employeeName: this.EmployeeName,
              employeeId: this.EmployeeId
              };
      this.restApi.createOrder(orderDetails).subscribe((data: {}) => {
            console.log(data);
            if (data != "") {
              this.orderConfirm = true;
            }
      });
  }

  Order() {
    this.orderConfirm = false;
  }

  addFoodTruck() {
    let foodMenu = {
      foodTruckName: this.foodTruckName,
      location: this.location,
      foodName: this.foodName,
      foodPrice: this.foodPrice
    }
    this.restApi.createMenu(foodMenu).subscribe((data: {}) => {
                console.log(data);
                if (data != "") {
                  this.menuConfirm = true;
                }
          });


  }

}
