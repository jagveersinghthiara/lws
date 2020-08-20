import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  loadForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  isFirm = false;
  customerList: any;
  brokerList: any;
  pickUpTime: any;
  dropTime: any;
  showCross = false;
  filesToUpload: File[];
  imagePath: any;
  fileData: File;
  imgURL: string | ArrayBuffer;
  startAt =  new Date();
  public min = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private commonService: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService



  ) {
    this.commonService.customer().subscribe(
      (response: any) => {
      this.customerList = response.body;
      },
      (error) => {
      });
    this.commonService.broker().subscribe(
        (response: any) => {
        this.brokerList = response.body;
        },
        (error) => {
        });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files as Array<File>;
    this.preview(fileInput.target.files);
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;


    const reader = new FileReader();
    this.imagePath = files;
    this.fileData =  files[0] as File;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  ngOnInit() {
    this.loadForm = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      brokerId: ['', [Validators.required]],
      loadTerm: ['', [Validators.required]],
      equipment: [''],
      file: [''],
      pickUpAddress: ['', [Validators.required]],
      dropAddress: ['', [Validators.required]],
      originCity: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      originState: ['', [Validators.required]],
      destinationState: ['', [Validators.required]],
      originZip: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{5,7}$'),
      ])]],
      destinationZip: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{5,7}$'),
      ])]],
      pickUpTime: ['', [Validators.required]],
      dropTime: ['', [Validators.required] ],
      rpm: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,7}$'),
      ])]],
      items: this.formBuilder.array([
        this.getItems(),
      ]),
      note: [''],
      distance: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,7}$'),
      ])]]
  });
  }

  getItems() {
    return this.formBuilder.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,4}$'),
      ])]],
      weight: ['',  [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,4}$'),
      ])]],

    });
  }

  remove(i) {
    const control = this.loadForm.controls.items as FormArray;
    if (control.controls.length <= 2) {
      this.showCross = false;
    }
    control.removeAt(i);
  }

get f() { return this.loadForm.controls; }


addItem() {
  const control = this.f.items as FormArray;
  control.push(this.getItems());
  this.showCross = true;
}
startSet() {
  this.min = this.f.pickUpTime.value;
}
/*
Load Add Function
*/
addLoad() {

  let pickUpTime = moment(this.f.pickUpTime.value).format(environment.dateFormat);
  pickUpTime = (moment.utc(pickUpTime, environment.dateFormat).unix() as any);
  let dropTime = moment(this.f.dropTime.value).format(environment.dateFormat);
  dropTime = (moment.utc(dropTime, environment.dateFormat).unix() as any);
  this.submitted = true;
  if (this.loadForm.invalid) {
   console.log('!invalid');
   return;
    }
    this.spinner.show();
  const formData = new FormData();
  const files: Array<File> = this.filesToUpload;
  if (this.filesToUpload) {
    // console.log(this.filesToUpload);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i], files[i].name);
      }
    formData.append('docs', 'yes');
  } else {
    formData.append('docs', 'no');

  }
  formData.append('note', this.f.note.value);
  formData.append('distance', this.f.distance.value);
  formData.append('customerId', this.f.customerId.value);
  formData.append('brokerId', this.f.brokerId.value);
  formData.append('loadTerm', this.f.loadTerm.value);
  formData.append('equipment', this.f.equipment.value);
  formData.append('pickUpAddress', this.f.pickUpAddress.value);
  formData.append('dropAddress', this.f.dropAddress.value);
  formData.append('originCity', this.f.originCity.value);
  formData.append('destinationCity', this.f.destinationCity.value);
  formData.append('originState', this.f.originState.value);
  formData.append('destinationState', this.f.destinationState.value);
  formData.append('originZip', this.f.originZip.value);
  formData.append('destinationZip', this.f.destinationZip.value);
  formData.append('pickUpTime', pickUpTime);
  formData.append('dropTime', dropTime);
  formData.append('rpm', this.f.rpm.value);
  formData.append('items',  JSON.stringify(this.f.items.value));


  this.http.post(this.baseUrl + 'load', formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.loadForm.reset();
          // tslint:disable-next-line: forin
        for (const i in this.loadForm.controls) {
            this.loadForm.controls[i].setErrors(null);
          }
        const control = this.loadForm.controls.items as FormArray;
          // tslint:disable-next-line: forin
        for (const i in control) {
            control.removeAt(1);
          }
          this.spinner.hide();
        this.submitted = false;

        this.router.navigate(['/load/view']);
      },
      (error) => {
        this.spinner.hide();
      });
  }
}
