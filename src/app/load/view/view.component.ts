import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {
  baseUrl = environment.baseUrl;
  loadForm: FormGroup;
  totForm: FormGroup;
  DMForm: FormGroup;
  pager = {};
  loadList = [];
  shopList = []
  page = 0;
  Invoice: boolean;
  addVehicle = true
  closeResult: string;
  routeId: any;
  submitted: boolean;
  selectedShops: any = [];
  addDelivary: boolean = true;
  DrouteId: any;
  DmList: any = [];
  selectedDM: any = [];
  boxes: any = [];
  manage: boolean;
  boxRId: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,

  ) {
    this.loadPage();
  }
  ngOnInit() {

    this.loadForm = this.formBuilder.group({
      shopId: [''],
      // brokerId: ['', [Validators.required]],
    })
    this.DMForm = this.formBuilder.group({
      dmId: [''],
    })
    this.totForm = this.formBuilder.group({
      id: [''],
    })
  }

  get f() { return this.loadForm.controls; }
  get ff() { return this.DMForm.controls; }
  get fff() { return this.totForm.controls; }




  loadPage() {
    this.spinner.show();
    this.http.get(this.baseUrl + `route/getRoutes`).subscribe((response: any) => {
      this.loadList = response.data;
      this.getshop();
      this.getdelivaeyman()
      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide();
      });
  }
  getshop() {
    this.http.get(this.baseUrl + `admin/admin_buyers`).subscribe((response: any) => {
      this.shopList = response.data;

      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide();
      });
  }
  getdelivaeyman() {
    this.http.get(this.baseUrl + `delivery/getDeliveryMans`).subscribe((response: any) => {
      this.DmList = response.data;

      this.spinner.hide();
    },
      (error) => {
        this.spinner.hide();
      });
  }


  SelectShop(e) {
    console.log(e.target.value);

    let obj = JSON.parse(e.target.value);
    console.log(obj.routeId)
    if (obj.routeId || (obj.routeId == '' || obj.routeId == 0)) {
      alert("Shop Is already selected");
      this.loadForm.reset();
      return false;
    }

    const found = this.selectedShops.some(el => el.shopId === obj.shopId);
    console.log(found);

    if (!found) {
      this.selectedShops.push(obj);

    } else {
      alert("Shop Is already selected")
    }
    this.loadForm.reset();

    // this.selectedShops.push(obj);

  }

  SelectDM(e) {
    this.spinner.show();
    let obj = JSON.parse(e.target.value);
    this.http.get(this.baseUrl + 'delivery/getDeliverymanRoute?deliverymanId=' + obj.deliverymanId).subscribe(
      (response: any) => {
        this.spinner.hide();
        // console.log(response)
        if (response.success == 1) {
          alert("Delivery man Is already selected for - " + response.data[0].route_name);
          this.DMForm.reset()
          return false;

        } else {
          this.selectedDM = [obj];
        }
      }
    )

    this.DMForm.reset();
  }
  removeDm(i) {
    this.selectedDM.splice(i, 1);
  }
  remove(i) {
    this.selectedShops.splice(i, 1);
  }
  removebox(i) {
    this.boxes.splice(i, 1);

  }
  /*
  Load Delete Function
  */
  deleteLoad(id) {
    if (confirm('Are you sure to delete Route')) {
      let body = new URLSearchParams();
      body.set('routeId', id);

      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.http.post(this.baseUrl + 'route/deleteRoute/', body.toString(), options).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.loadPage()
        },
        (error) => {
        });
    }
  }
  showVehicle(id, route) {

    if (id != this.routeId) {
      this.loadForm.reset();
      this.addVehicle = false;
      this.addDelivary = true;
      this.DrouteId = null;

      this.route = route
      this.routeId = id;
      this.selectedShops = []

      this.http.get(this.baseUrl + `route/viewRouteShop?routeId=` + id).subscribe((response: any) => {

        if (response.success == 1) {
          this.selectedShops = response.data
        }
        this.spinner.hide();
      },
        (error) => {
          this.spinner.hide();
        });
    } else {
      return
    }


  }
  
  cancel() {
    this.loadForm.reset();
    this.DMForm.reset();
    this.boxRId = null
    this.totForm.reset()
    this.addVehicle = true;
    this.route = null
    this.routeId = null;
    this.DrouteId = null;
    this.selectedShops = []
    this.selectedDM = []
  }
  addShop() {
    this.submitted = true;

    let selectedShop = [];
    let body = this.selectedShops;
    for (let i = 0; i < this.selectedShops.length; i++) {
      const element = this.selectedShops[i].shopId;
      let arr = [this.routeId.toString(), element.toString()]
      selectedShop.push(arr)
    }

    // console.log(selectedShop)
    this.http.post(this.baseUrl + '/route/routeShop', selectedShop).subscribe(
      (response: any) => {
        this.submitted = false;
        this.toastr.success("Shop Added To " + this.route + " Sucessfully");
        this.loadForm.reset();

        // tslint:disable-next-line: forin
        for (const i in this.loadForm.controls) {
          this.loadForm.controls[i].setErrors(null);
        }
        this.spinner.hide();
        this.loadForm.reset();
        this.addVehicle = true;
        this.route = null
        this.routeId = null
        this.selectedShops = [];
        this.getshop()
      },
      (error) => {
        this.spinner.hide();
      });

  }
  addDM() {
    this.submitted = true;
    let body = new URLSearchParams();
    body.set('routeId', this.DrouteId);
    body.set('deliverymanId', this.selectedDM[0].deliverymanId);
    body.set('vehicleId', "3");
    body.set('starting_miles', "0");

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.post(this.baseUrl + '/route/assigndeliveryman', body.toString(), options).subscribe(
      (response: any) => {
        this.submitted = false;

        this.toastr.success("Delivery Man Added To " + this.route + " Sucessfully");
        this.DMForm.reset();
        for (const i in this.DMForm.controls) {
          this.DMForm.controls[i].setErrors(null);
        }
        this.spinner.hide();
        this.DMForm.reset();
        this.cancel()
        this.getshop()
        this.loadPage()

      },
      (error) => {
        this.spinner.hide();
      });
  }
  showDeliveryMan(id, route) {
    if (id != this.DrouteId) {
      this.selectedShops = []
      this.route = route;
      this.DrouteId = id;
      this.routeId = null;

      this.addDelivary = false
      this.loadForm.reset();
      this.addVehicle = true;
    }
    else {
      return
    }
  }
}