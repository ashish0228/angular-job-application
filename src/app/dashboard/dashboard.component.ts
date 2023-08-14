import { Router } from '@angular/router';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from './service/dashboard.service';
import { toasterClass } from '../toaster/toaster.class';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'email', 'address', 'contactNumber', 'expectedCTC', 'preferredLocation', 'action'];
  dataSource: any = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  searchValueInput = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | undefined;

  noOfRecordOnEachPage = 5;
  pageIndex = 1;
  pageSize = 5;
  totalRecord = 5;
  constructor(private dashboardService: DashboardService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toaster: toasterClass) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    const paginationData = {
      noOfRecordOnEachPage: this.pageSize,
      currentPageNumber: this.pageIndex,
    }
    this.dashboardService.getAllData(paginationData).subscribe((res : any) => {
      if (res && res.data.data.length) {
        this.dataSource = new MatTableDataSource(res.data.data);
        this.totalRecord = res.data.totalRecord;
        this.cdr.detectChanges();
      } else {
        this.toaster.showToaster('info', 'No Data Found');
      }
     });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  deleteUser(element: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dashboardService.deleteUser(element._id).subscribe((res: any) => {
          Swal.fire(
            'Deleted!',
            'Job Application Has Deleted.',
            'success'
          )
        });
      }
    })
  }

  editUser(element: any) {
    this.router.navigate(['/jobapplicationEdit/', element._id])
  }

  searchValue() {
    if (this.searchValueInput) {
      const data = {
        searchValue: this.searchValueInput
      };
      this.dashboardService.getSearch(data).subscribe((res: any) => {
        if (res && res.data) {
          this.dataSource = new MatTableDataSource(res.data);
          this.cdr.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    } else {
      this.getAllData();
    }
  }
  pageEvent(event: any) {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex + 1;
    if(!this.searchValueInput) {
    this.getAllData();
    }
  }
}

export interface PeriodicElement {
  name: string;
  email: string;
  address: string;
  contactNumber: string;
  expectedCTC: string;
  preferredLocation: string;
}

let ELEMENT_DATA: PeriodicElement[] = [];

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
