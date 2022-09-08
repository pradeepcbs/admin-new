import { StoreListResponseDto } from './../interfaces/items.interface';
import { environment } from './../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  message: any = '';
  imagePath: any;
  constructor(private http: HttpClient) {}

  // Create
  postData(url: string, data?: any): Observable<any> {
    return this.http
      .post(environment.API_URL + url, data)
      .pipe(catchError(this.error));
  }

  postFileData(url: string, data?: any, req?: any): Observable<any> {
    return this.http.post(environment.API_URL + url, data);
    // .pipe(catchError(this.error));
  }

  // Read
  getData(url: string) {
    return this.http.get(environment.API_URL + url);
  }

  getFilterData(url: string, option: any) {
    return this.http.get(environment.API_URL + url).pipe(
      map((spots: any) => {
        return spots.data.filter((spot: any) => {
          return spot.account == option;
        });
      })
    );
  }

  // Update
  updateData(url: string, id: any, data: any): Observable<any> {
    return this.http
      .put(environment.API_URL + url, data)
      .pipe(catchError(this.error));
  }

  // Delete
  deleteData(url: string, id: any): Observable<any> {
    return this.http
      .delete(environment.API_URL + url)
      .pipe(catchError(this.error));
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  calculateDiff(sentDate: any) {
    var date1: any = new Date(sentDate);
    var date2: any = new Date();
    var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  convertedDate(dateJson: any) {
    const dateValue = new Date(
      dateJson.year,
      dateJson.month - 1,
      dateJson.day,
      0,
      0,
      0,
      0
    );
    return dateValue.toDateString();
  }

  getcountry() {
    return this.http.get(environment.API_URL + 'customers/getCountries/');
  }

  getState(countryId: any) {
    return this.http.post(environment.API_URL + 'customers/getStates/', {
      countryId: countryId,
    });
  }

  getCity(stateId: any) {
    return this.http.post(environment.API_URL + 'customers/getCities/', {
      stateId: stateId,
    });
  }

  uploadImage(files: any) {
    const fd = new FormData();
    fd.append('document', files[0]);
    return this.postFileData('documents/documentUpload', fd, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getImageUrl(val: any) {
    return environment.SERVER_URL + val;
  }

  checkLoginType() {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  getStores(): Observable<any[]> {
    return this.postData('stores/list', {
      page: 1,
      itemPerPage: 10,
    }).pipe(
      take(1),
      map((res: StoreListResponseDto) => {
        return res.data.map((o) => ({
          value: o._id,
          label: o.name,
        }));
      })
    );
  }

  getTax(): Observable<any[]> {
    return this.postData('tax/list', {
      page: 1,
      itemPerPage: 10,
    }).pipe(
      take(1),
      map((res: StoreListResponseDto) => {
        return res.data.map((o) => ({
          value: o._id,
          label: o.name,
        }));
      })
    );
  }

  getItems(): Observable<any[]> {
    return this.postData('items/list', {
      page: 1,
      itemPerPage: 10,
    }).pipe(
      take(1),
      map((res: StoreListResponseDto) => {
        return res.data.map((o) => ({
          value: o._id,
          label: o.name,
        }));
      })
    );
  }

  getCategory(): Observable<any[]> {
    return this.postData('category/list', {
      page: 1,
      itemPerPage: 100,
    }).pipe(
      take(1),
      map((res: StoreListResponseDto) => {
        return res.data.map((o) => ({
          value: o._id,
          label: o.name,
        }));
      })
    );
  }

  getSubCategory(id: any) {
    return this.getData(`subcategory/getSubcategories/${id}`).pipe(
      take(1),
      map((res: any) => {
        return res.data.map((o: any) => ({
          value: o._id,
          label: o.name,
        }));
      })
    );
  }
  getPackageList() {
    return this.postData('package/list', {
      page: 1,
      itemPerPage: 10,
    }).pipe(
      take(1),
      map((res: any) => {
        console.log(res, 'response package');
        return res.data.map((o: any) => ({
          value: o._id,
          label: o.name,
        }));
      })
    );
  }

  async getCategoryDetailsById(id: any) {
    let categoryData = await this.getData(
      `category/getDetails/${id}`
    ).toPromise();
    console.log(categoryData, 'check category data');
    // return {
    //   name: categoryData.data.name,
    //   media: categoryData.data.media,
    //   description: categoryData.data.description,
    //   storeID: categoryData.data.storeID,
    // };
  }
}
