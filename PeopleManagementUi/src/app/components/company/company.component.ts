import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  newItem: Company = {};
  dataSource: Company[] = []; 

  constructor(private service: CompanyService, private router : Router) { }

  ngOnInit(): void {
    this.service.getItem().subscribe((items) => {
      this.dataSource = items;

    });
  }

  addItem(){
    this.service.addItem(this.newItem).subscribe((item) => {
      this.dataSource = [...this.dataSource, item];
      this.newItem = {};
    });
  }

  updateItem(id: number, item: Company){
    this.service.updateItem(id, item).subscribe(() => {
      item.isEditing = false;
      this.dataSource = this.dataSource.map((newitem) => (newitem.id === item.id ? item : newitem))
    });
  }

  deleteItem(item: Company){
    this.service.deleteItem(item).subscribe(() => {
      this.dataSource = this.dataSource.filter((newitem) => newitem.id !== item.id)
    });
  }

  filterByLocation(item: Company){
    this.service.filterByLocation(item).subscribe(() => {
      this.dataSource = this.dataSource.filter((newItem) => newItem.location?.toLocaleLowerCase() == item.location?.toLocaleLowerCase())
    });

  }

  navigateToAddPage() {
    this.router.navigate(['company/add']);
  }

  navigateToUpdatePage() {
    this.router.navigate(['company/:id/edit/']);
  }



}



