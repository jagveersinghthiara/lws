import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  baseUrl = environment.baseUrl;
  htmlImages = environment.htmlImages;
  url = environment.imagesUrl;
  loadStatus: number;
  loadId: string;


  invoiceStatus: any;
  id: string;
  tracks: any;
  data: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
    this.getData();

  }
  getData() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.baseUrl + 'loadTrack/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.tracks = response.body;
      });

    this.http.get(this.baseUrl + 'loadDetail/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
        (response: any) => {
this.data = response.body;

        });
  }
  ngOnInit() {
  }




}
