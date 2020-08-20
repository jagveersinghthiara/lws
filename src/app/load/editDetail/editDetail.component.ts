import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { CommonService } from '../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './editDetail.component.html',
  styleUrls: ['./editDetail.component.css']
})
export class EditDetailComponent implements OnInit {
  loadForm: FormGroup;
  baseUrl = environment.baseUrl;
  htmlImages = environment.htmlImages;
  url = environment.imagesUrl;
  loadStatus: number;
  loadId: string;
  id: any = 'N/A';
  showCross: boolean;
  // f: any;
  submitted: boolean;
  customerList: any;
  brokerList: any;
  prevDocs: boolean;
  files: any;
  filesToUpload: File[];
  imagePath: any;
  fileData: File;
  imgURL: string | ArrayBuffer;
  notes: any;
  role: string;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public router : Router,
    private spinner: NgxSpinnerService

  ) {
    this.setData();
  }

  setData() {

    this.commonService.allCustomer().subscribe(
      (response: any) => {
        this.customerList = response.body;
      },
      (error) => {
      });
    this.commonService.allBroker().subscribe(
      (response: any) => {
        this.brokerList = response.body;
      },
      (error) => {
      });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.baseUrl + 'loadDetail/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {

        this.f.customerId.setValue(response.body.customerId);
        this.f.brokerId.setValue(response.body.brokerId);
        this.f.loadTerm.setValue(response.body.loadTerm);
        this.f.pickUpAddress.setValue(response.body.pickUpAddress);
        this.f.dropAddress.setValue(response.body.dropAddress);
        this.f.originCity.setValue(response.body.originCity);
        this.f.destinationCity.setValue(response.body.destinationCity);
        this.f.originState.setValue(response.body.originState);
        this.f.destinationState.setValue(response.body.destinationState);
        this.f.originZip.setValue(response.body.originZip);
        this.f.destinationZip.setValue(response.body.destinationZip);
        this.f.rpm.setValue(response.body.rpm);
        this.f.distance.setValue(response.body.distance);

        const items = response.body.loadItems;
        this.f.pickUpTime.setValue(new Date(response.body.pickUpTime * 1000));
        this.f.dropTime.setValue(new Date(response.body.dropTime * 1000));
        this.files = response.body.loadDocuments;
        this.notes = response.body.loadNotes.reverse();
        if (this.files.length > 0) {
          this.prevDocs = true;
        }

        if (items.length > 0) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < items.length; i++) {
            const element = items[i];
            this.addItems(element);
          }
        } else {
          this.getItems();
        }
      });
  }

  ngOnInit() {
    this.loadId= this.activatedRoute.snapshot.paramMap.get('id'),
    this.loadForm = this.formBuilder.group({
      note: [''],
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
      dropTime: ['', [Validators.required]],
      rpm: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,7}$'),
      ])]],

      distance: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,7}$'),
      ])]],
      items: this.formBuilder.array([
        // this.getItems(),
      ]),
    });

    // tslint:disable-next-line: radix
    const role = parseInt(localStorage.getItem('user'));
    if (role == 7 || role == 8 || role == 11) {
      this.role = 'invoice';
      this.disableAll();
    } else if (role == 3 || role == 4 || role == 9) {
      this.role = 'sales';
    } else if (role == 5 || role == 6 || role == 10) {
      this.role = 'dispatcher';
    } else {
      this.role = 'admin';
    }
  }
  get f() { return this.loadForm.controls; }
  disableAll() {
    this.f.rpm.disable();
    this.f.customerId.disable();
    this.f.brokerId.disable();
    this.f.loadTerm.disable();
    this.f.equipment.disable();
    this.f.pickUpAddress.disable();
    this.f.dropAddress.disable();
    this.f.originCity.disable();
    this.f.destinationCity.disable();
    this.f.originState.disable();
    this.f.destinationState.disable();
    this.f.originZip.disable();
    this.f.destinationZip.disable();
    this.f.pickUpTime.disable();
    this.f.dropTime.disable();

  }
  getItems() {
    return this.formBuilder.group({
      itemName: ['', Validators.required],
      quantity: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,4}$'),
      ])]],
      weight: ['', Validators.required],

    });
  }

  addItems(items) {
    let disable = false;
    if (this.role == 'invoice') {
      disable = true;
    }
    const control = this.f.items as FormArray;
    control.push(
      this.formBuilder.group({
        itemName: [ { value: items.itemName, disabled: disable } , Validators.required ],
        quantity: [ { value: items.itemQuantity, disabled: disable } , Validators.required  , [Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{1,4}$'),
        ])]],
        weight: [{ value: items.itemWeight, disabled: disable } , Validators.required ],

      })
    );
  }

  remove(i) {
    const control = this.loadForm.controls.items as FormArray;
    if (control.controls.length <= 2) {
      this.showCross = false;
    }
    control.removeAt(i);
  }
  addItem() {
    const control = this.f.items as FormArray;
    control.push(this.getItems());
    this.showCross = true;
  }

  chngeStatus(e) {
    const value = e.target.value;
    const data = {
      loadId: this.activatedRoute.snapshot.paramMap.get('id'),
      status: value
    };
    this.http.put(this.baseUrl + 'loadStatus', data).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
      });
  }

  updateLoad() {
    this.spinner.show();
    let pickUpTime = moment(this.f.pickUpTime.value).format(environment.dateFormat);
    pickUpTime = (moment.utc(pickUpTime, environment.dateFormat).unix() as any);
    let dropTime = moment(this.f.dropTime.value).format(environment.dateFormat);
    dropTime = (moment.utc(dropTime, environment.dateFormat).unix() as any);
    this.submitted = true;
    if (this.loadForm.invalid) {
      this.toastr.error('Invalid data entred !');
      console.log('!invalid');
      this.spinner.hide();
      return;
    }
    const formData = new FormData();
    if (this.filesToUpload) {
      // console.log(this.filesToUpload);
      const files: Array<File> = this.filesToUpload;

      for (let i = 0; i < files.length; i++) {
        console.log('i-', i);
        formData.append('image', files[i], files[i].name);
      }
      formData.append('docs', 'yes');
    } else {
      formData.append('docs', 'no');

    }
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
    formData.append('distance', this.f.distance.value);

    formData.append('items', JSON.stringify(this.f.items.value));
    formData.append('id', this.id);

    this.http.put(this.baseUrl + 'load', formData).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.toastr.success(response.message);
        this.ngOnInit();
        this.setData();
        this.submitted = false;
        this.router.navigate(['/load/view']);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.success(error.message);
      });
  }

  deleteDoc(id) {
    const delId = this.files[id].id;
    if (confirm('Are you sure to delete Document - ' + this.files[id].name)) {
      this.http.delete(this.baseUrl + 'loadDoc/' + delId).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.files.splice(id, 1);
        },
        (error) => {
        });

    } else {
      console.log('not Del...');
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
    this.fileData = files[0] as File;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }


}
