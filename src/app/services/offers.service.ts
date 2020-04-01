import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import * as AppUtil from '../common/app.util';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

constructor(private http: HttpClient) { }

saveOffer(offer) {
const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
const httpOptions = {
    headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',

          'Authorization':`Bearer ${token}`,
        }
    )
}
return this.http.post('http://localhost:5000/offers/add', offer, httpOptions);
   // .map(resp => resp.json());
}

getOffer() {
  const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
  const httpOptions = {
      headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',

            'Authorization':`Bearer ${token}`,
          }
      )
  }
  return this.http.get('http://localhost:5000/offers/list',   httpOptions)
  // .pipe(map((res: Response) => res.json()));
}
deleteOffer(id) {
  const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
  const httpOptions = {
      headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',

            'Authorization':`Bearer ${token}`,
          }
      )
  }
  return this.http.delete(`http://localhost:5000/offers/remove/${id}`,  httpOptions);
}

editProduct(id) {
  return this.http.get(`http://localhost:5000/offers/update/${id}`, {
    headers: { "Content-Type": "application/json" }
  });
}

updateOffer(id) {
  const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
  const httpOptions = {
      headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',

            'Authorization':`Bearer ${token}`
          }
      )
  }
  return this.http.put(`http://localhost:5000/offers/update/${id}`, httpOptions);
}
}



/*
saveOffer(offer) {
  const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
  const header = new HttpHeaders();
  header.append('Authorization', `Bearer ${token}`);
  header.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:5000/offers/add', offer , { headers: header});
  //  .map(resp => resp.json());

} */
