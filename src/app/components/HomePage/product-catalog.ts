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

  addProductToUser(url: any, body: {}, customHeaders: { [key: string]: string }){
   // 1. Initialize HttpHeaders
    let mockheaders = new HttpHeaders();

        mockheaders = mockheaders.set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJ0ZWphc0BleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MjY5OTQwNSwiZXhwIjoxNzYyNzAzMDA1fQ.6FMwoZNq640g5JZw84cO6X2Y0InM9YbT32Ejn0cqX10");
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
        if(res.TOKEN !== ""){
          localStorage.setItem("TOKEN", res.TOKEN);
        }
        let token = localStorage.getItem("TOKEN");
        const headersToSet = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        // mockheaders = mockheaders.set("Authorization", `Bearer ${token}` );
        this.addProductToUser(url,body,headersToSet).subscribe({
          next: (res:any) => {
            if(res.modifiedCount === 1){
              alert("Added to Cart");
            }
          },
          error: (err:any) => {
            console.error('Error Adding products:', err);
          }
        });  
      },
      error: (err:any) => {
        console.error('Error creating token:', err);
      }
    })

    
  }
}
