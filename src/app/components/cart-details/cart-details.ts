import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart-details',
  standalone:true,
  imports: [CommonModule,MatButtonModule,MatCardModule,MatRippleModule,HttpClientModule],
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css'
})

export class CartDetails {
  private getUserCartDetails:any = environment.getUserName; 
  private getProductApiUrl = environment.getProductById; 
  private deleteProductsFromCart = environment.deleteProductsFromCart;

  
  public totalPrice = 0;
  public username :String ="";
  public products: any = [];
  public randomId = "#ELX-458921";
  cartProductIds :any =[];
  constructor(private router:Router,private http: HttpClient) { }

  getProductsById(id: any) {
    const url = this.getProductApiUrl.replace(':id', id);
    return this.http.get(url);
  }


  ngOnInit(){
    this.username = localStorage.getItem('username') ?? "Guest";
    this.getCartProductIds();
  }

   removeFromCartUser(url: any, token: any, body: {}){
    console.log('Calling API:', url);
   // 1. Initialize HttpHeaders
    let mockheaders = new HttpHeaders();

    mockheaders = mockheaders.set("Authorization", `Bearer ${token}`);
    // 3. Create the options object for the request
    let options = {
      headers: mockheaders
    };
    return this.http.post(url,body,options);
  }

  
  //creating an token
  getToken(url:string , body: {}){
    console.log('Calling API:', url);
    return this.http.post(url,body);
  }

  
  removeFromCart(product:any){
    const url = environment.deleteProductsFromCart;
    const body:{} = { 
      username : this.username,
      productId : product.id
    }    
    const payloadToken :{} = {
      tokenPayload : {
        id: "12345",
        email: "tejas@example.com",
        role: "admin"
      },
      secret : this.username 
    };

    console.log("Payload Token "+ payloadToken);
    this.getToken(environment.getToken,payloadToken).subscribe({
      next: (res:any) => {
        let token = res.TOKEN ?? "";
        this.removeFromCartUser(url,token,body).subscribe({
          next: (res:any) => {
            if(res.modifiedCount === 1){
              alert("Remove from Cart");
              this.router.navigate(['/products'])
            }
          },
          error: (err:any) => {
            console.error('Error removing products:', err);
          }
        });  
      },
      error: (err:any) => {
        console.error('Error creating token:', err);
      }
    })

    
  }

  getCartProductByUser(){
    this.products = [];
    if(this.username !== ""){
      for(let id of this.cartProductIds){
        
        this.getProductsById(id).subscribe({
          next :(data:any)=>{
            this.products.push(data);
            this.totalPrice += data.price;
            console.log("Cart Product Ids :" + this.cartProductIds);
            },
            error : (err:any)=>{
              console.log("Error in finding Product :" + JSON.stringify(err));
            }
        });
      }
    }
    else{
      this.router.navigate(['/login']); 
      alert("Please login to Get Cart Details");
    }
  }

  getCartProductIds(){
    
    const url = this.getUserCartDetails.replace(':username',this.username);  
    this.getCartDetails(url).subscribe({
        next: (data:any) => {
          if(data.ProductIds.length == 0){
            alert("No Items in Cart");
            this.router.navigate(['/products']);
          }
          this.cartProductIds = data.ProductIds ?? [];
          this.getCartProductByUser();
        },
        error: (err) => {
          console.error('Error fetching cart details', err);
        } 
      });

  }

  getCartDetails(url:any){
    return this.http.get(url);
  }

  isCheckoutDone = false;

  checkOut(){
    
    this.randomId =  "#ELX-"+ Math.round(Math.random()*100000);
  // here you can call API / payment logic
  this.isCheckoutDone = true;
  }
  
}
