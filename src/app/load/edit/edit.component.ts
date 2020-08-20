import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

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
  loadStatus: number;
  loadId: string;
  carrierLegalName = 'N/A';
  carrierDbaName = 'N/A';
  carrierEmail = 'N/A';
  carrierPhone = 'N/A';
  driverName = 'N/A';
  driverEmail = 'N/A';
  driverPhone = 'N/A';
  vehicleNumber = 'N/A';
  vehicleType = 'N/A';
  licenseNumber = 'N/A';
  customerName = 'N/A';
  customerEmail = 'N/A';
  customerPhone = 'N/A';
  originCity = 'N/A';
  destinationCity = 'N/A';
  pickUpTime: any = 'N/A';
  dropTime: any = 'N/A';
  loadItems: any = 'N/A';
  equipment: any;
  loadTerm = 'N/A';
  rpm = 'N/A';
  responseArray: any = 'N/A';
  id: any = 'N/A';
  files: any;
  notes: any;
  role: string;
  distance: any;
  invoiceStatus: any;
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
    this.http.get(this.baseUrl + 'load/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.f.loadStatus.setValue(response.body.status);
        this.responseArray = response.body;
        this.loadStatus = response.body.status;
        this.loadId = this.activatedRoute.snapshot.paramMap.get('id');
        if (response.body.assignedLoad) {
          this.carrierLegalName = response.body.assignedLoad.carrierDetail.legalName;
          this.carrierDbaName = response.body.assignedLoad.carrierDetail.dbaName;
          this.carrierEmail = response.body.assignedLoad.carrierDetail.email;
          this.carrierPhone = response.body.assignedLoad.carrierDetail.phone;
          this.driverName = response.body.assignedLoad.driverDetail.name;
          this.driverEmail = response.body.assignedLoad.driverDetail.email;
          this.driverPhone = response.body.assignedLoad.driverDetail.phone;
          this.vehicleNumber = response.body.assignedLoad.driverDetail.vehicleNumber;
          this.vehicleType = response.body.assignedLoad.driverDetail.vehicleType;
          this.licenseNumber = response.body.assignedLoad.driverDetail.licenseNumber;
          this.equipment = response.body.assignedLoad.driverDetail.assingEquiptments;
        }
        this.customerName = response.body.customerName;
        this.customerEmail = response.body.customerEmail;
        this.customerPhone = response.body.customerPhone;
        this.originCity = response.body.originCity;
        this.destinationCity = response.body.destinationCity;
        this.pickUpTime = response.body.pickUpTime * 1000;
        this.dropTime = response.body.dropTime * 1000;
        this.loadItems = response.body.loadItems;
        this.loadTerm = response.body.loadTerm;
        this.rpm = response.body.rpm;
        this.files = response.body.loadDocuments;
        this.distance = response.body.distance;

        this.notes = response.body.loadNotes.reverse();
        if (this.loadStatus >= 7) {
          this.http.get(this.baseUrl + 'invoice/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            (response: any) => {
              this.invoiceStatus = response.body.status;
              this.f.invoiceStatus.setValue(this.invoiceStatus);
              this.f.invoiceRef.setValue(response.body.refNo);
            });
        }
      });
  }
  ngOnInit() {

    this.loadForm = this.formBuilder.group({
      loadStatus: ['', [Validators.required]],
      note: [''],
      invoiceStatus: [{ value: '', disabled: true }],
      invoiceRef: [{ value: '', disabled: true }],

    });
    // tslint:disable-next-line: radix
    const role = parseInt(localStorage.getItem('user'));
    if (role == 7 || role == 8 || role == 11) {
      this.role = 'invoice';
      this.f.invoiceStatus.enable();
      this.f.invoiceRef.enable();
    } else if (role == 3 || role == 4 || role == 9) {
      this.role = 'sales';
    } else if (role == 5 || role == 6 || role == 10) {
      this.role = 'dispatcher';
    } else {
      this.f.invoiceStatus.enable();
      this.f.invoiceRef.enable();
      this.role = 'admin';
    }


  }

  get f() { return this.loadForm.controls; }

  chngeStatus(e) {
    const r = confirm('Are you sure You want to Update Status');
    if (r == true) {


      const value = e.target.value;
      const data = {
        loadId: this.activatedRoute.snapshot.paramMap.get('id'),
        status: value
      };
      this.http.put(this.baseUrl + 'loadStatus', data).subscribe(
        (response: any) => {
          this.loadStatus = value;
          this.toastr.success(response.message);
          this.ngOnInit();
          this.getData();
        }, (error) => {
          this.f.loadStatus.setValue(this.loadStatus);
        });
    } else {

      this.f.loadStatus.setValue(this.loadStatus);
      this.toastr.warning('change has been canceled ');

    }
  }

  addNotes() {

    if (this.f.note.value == '') {
      this.toastr.warning('Note cannot be empty !');
      return;
    }
    const data = {
      loadId: this.activatedRoute.snapshot.paramMap.get('id'),
      note: this.f.note.value
    };
    this.http.post(this.baseUrl + 'addNote', data).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.notes = response.body.reverse();
        this.f.note.setValue('');
      });
  }

  delnote(id) {
    // console.log(noteId)

    const delId = this.notes[id].id;
    if (confirm('Are you sure to delete Note - ' + this.notes[id].content)) {
      this.http.delete(this.baseUrl + 'loadNote/' + delId).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.notes.splice(id, 1);
        },
        (error) => {
        });

    } else {
      console.log('not Del...');
    }



  }

  chngeInvoiceStatus(e) {
    const value = e.target.value;
    if (value == 2) {
      if (this.f.invoiceRef.value == '') {
        this.f.invoiceStatus.setValue(this.invoiceStatus);
        return this.toastr.warning('Invoice ref no is required');
      }
    }
    const r = confirm('Are you sure You want to Update Invoice Status');
    if (r == true) {
      const data = {
        loadId: this.activatedRoute.snapshot.paramMap.get('id'),
        status: value,
        refNo: this.f.invoiceRef.value || ''
      };
      this.http.put(this.baseUrl + 'loadInvoiceStatus', data).subscribe(
        (response: any) => {
          this.invoiceStatus = value;
          if (value == 2) {
            this.f.invoiceRef.disable();
            this.f.invoiceStatus.disable();

          }
          this.toastr.success(response.message);
        }, (error) => {
          this.f.invoiceStatus.setValue(this.invoiceStatus);
        });
    } else {

      this.f.invoiceStatus.setValue(this.invoiceStatus);
      this.toastr.warning('Change has been canceled ');

    }
  }
}
