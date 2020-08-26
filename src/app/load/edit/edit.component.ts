import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  loadForm: FormGroup;
  baseUrl = environment.baseUrl;
  htmlImages = environment.htmlImages;
  url = environment.imagesUrl;
  ShopList = []
  id: string;
  shopId: any;
  ShopName: any;
  boxes: any = [];
  oldboxes: any = [];
  showBoxes: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    this.getData();

  }
  getData() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.baseUrl + 'route/viewRouteShop?routeId=' + this.id).subscribe(
      (response: any) => {
        console.log(response);
        this.ShopList = response.data
      })
  }
  ngOnInit() {

    this.loadForm = this.formBuilder.group({
      id: [''],
      amount: ['', [Validators.required]],
    });
    // tslint:disable-next-line: radix
    const role = parseInt(localStorage.getItem('user'));
  }

  get f() { return this.loadForm.controls; }


  showDetails(id, name) {
    this.reset()
    this.boxes= [];
    this.showBoxes =true
    this.shopId = id;
    this.ShopName = name;
    this.getBoxes()
  }

  getBoxes() {
    this.http.get(this.baseUrl + 'delivery/showTotesByShop?routeId=' + this.id + '&shopId=' + this.shopId).subscribe(
      (response: any) => {
        console.log(response);
        this.oldboxes = response.data
      })
  }

  addbox() {
    let boxNo = this.loadForm.value.id
    let r = true
    if (r == true) {
      this.boxes.push({ 'barcode': boxNo })
  this.loadForm.patchValue({'id':''})
    } else {
      this.toastr.warning('Request has been canceled ');

    }
  }
  saveBoxes() {
  
if(this.boxes.length==0){

  this.addAmount()
  return
}
    let arr = [];
    for (let i = 0; i < this.boxes.length; i++) {
      const element = this.boxes[i];
      console.log(element)
      let pickUpTime = moment(new Date()).format(environment.dateFormat);
      let date = pickUpTime
      arr.push([element.barcode, parseInt(this.id), this.shopId, date])
    }

    this.http.post(this.baseUrl + 'route/assignedTotes', arr).subscribe(
      (response: any) => {
       this.addAmount()
      }, (error) => {
      });
  }
  addAmount(){
    let data = {
      routeId: this.id,
      shopId: this.shopId,
      amount: this.loadForm.value.amount
    }
    this.http.post(this.baseUrl + 'route/add_amount', data).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
      })

      this.reset()
  }
  reset(){
    this.boxes= [];
    this.showBoxes =false
    this.loadForm.reset()
    this.getData();
    this.ngOnInit()
  } 
  remove(i) {
    let boxNo = this.boxes[i].barcode
    const r = confirm('This Will Delete Box ' + boxNo + " from shop " + this.ShopName);
    if (r == true) {
      this.boxes.splice(i, 1);
    }
  }

}
