import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-product-catalog',
  standalone :true,
  imports: [CommonModule,MatButtonModule,MatCardModule,MatRippleModule,HttpClientModule],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})

export class HomePage {
  private apiUrl = environment.getProducts;
  public products: any = [];
  constructor(private http: HttpClient) {}
  
  username = localStorage.getItem("username") ?? "";

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  addProductToUser(url: any, body: {}, token:any){
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


  ngOnInit() {
    this.getProductList();
  }

  getToken(url:string , body: {}){
    console.log('Calling API:', url);
    return this.http.post(url,body);
  }

  getProductList(){
    this.getProducts().subscribe({
      next: (res:any) => {
        this.products = res;
      },
      error: (err:any) => {
        console.error('Error fetching products:', err);
      }
    });
  } 

  addToCart(product:any){
    const url = environment.addToCart;
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

    this.getToken(environment.getToken,payloadToken).subscribe({
      next: (res:any) => {
        let token = res.TOKEN ?? '';
        // mockheaders = mockheaders.set("Authorization", `Bearer ${token}` );
        this.addProductToUser(url,body,token).subscribe({
          next: (res:any) => {
            if(res.modifiedCount === 1){
              alert("Added to Cart");
            }
          },
          error: (err:any) => {
            if(err.status === 401){
              alert("please Log in to add items to cart");
            }
          }
        });  
      },
      error: (err:any) => {
        console.error('Error creating token:', err);
      }
    })

    
  }
}
