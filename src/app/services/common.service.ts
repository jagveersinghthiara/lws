import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
  ) { }
  ////// ================================ List All Customers Service ======================================== //////
  customer() {
    return this.http.get(this.baseUrl + 'shipper');
  }
  allCustomer() {
    return this.http.get(this.baseUrl + 'allShipper');
  }
 ////// ================================ List All Brokers Service ======================================== //////
 broker() {
    return this.http.get(this.baseUrl + 'broker');
  }

  allBroker() {
    return this.http.get(this.baseUrl + 'allbroker');
  }
  ////// ================================ List All Carrier Service ======================================== //////
  carrier() {
    return this.http.get(this.baseUrl + 'carrier');
  }
  carrierByType(type) {
    return this.http.get(this.baseUrl + 'carrier/' + type);
  }
  ////// ================================ List All Driver Service ======================================== //////
  driver() {
    return this.http.get(this.baseUrl + 'driverByCarrier/0');
  }
  // ========================================================================================================//
  roles() {
    return this.http.get(this.baseUrl + 'roles');
  }
  // =========================================================================================//
  profile() {
    return this.http.get(this.baseUrl + 'profile');
  }
}
