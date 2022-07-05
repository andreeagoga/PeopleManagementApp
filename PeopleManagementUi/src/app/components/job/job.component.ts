import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/models/company';
import { Job } from 'src/app/models/job';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  newJob: Job = {};
  newCompany: Company= {};
  dataSourceJob?: Job[] = [];
  private routeSub: Subscription = new Subscription();
  dataSource?: Company;

  constructor(private serviceCompany: CompanyService, private serviceJob: JobService , private routerNew: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'] as number;
      // console.log(id);
      this.serviceCompany
        .getCompanyById(id)
        .subscribe((item: Company) => {
          this.dataSource = item;
          this.dataSourceJob = item.jobs;
        });
    });

  }

  deleteItem(item: Job){
    this.route.params.subscribe((params) => {
      const id = params['id'] as number;
      this.serviceJob.deleteItem(item, id).subscribe(() => {
        this.dataSourceJob = this.dataSourceJob?.filter((newItem) => newItem.id != item.id)
      });
    });
  }

  // filterByTitle(item: Job){
  //   this.route.params.subscribe((params) => {
  //     const id = params['id'] as number;
  //     this.serviceJob.filterByTitle(item, id).subscribe(() => {
  //     this.dataSourceJob = this.dataSourceJob.filter((newItem) => newItem.title == item.title)
  //   });
  // });
  // }

  // filterByType(item: Job){
  //   this.route.params.subscribe((params) => {
  //     const id = params['id'] as number;
  //     this.serviceJob.filterByType(item, id).subscribe(() => {
  //     this.dataSourceJob = this.dataSourceJob.filter((newItem) => newItem.type == item.type)
  //   });
  // });
  // }

  filterByLocation(item: Job){
    this.route.params.subscribe((params) => {
      const id = params['id'] as number;
      this.serviceJob.filterByLocation(item, id).subscribe((jobs) => {
      this.dataSourceJob = jobs;
    });
  });
  }
  

  navigateToAddJobPage() {
    this.routerNew.navigate(['company/', this.dataSource?.id, 'job' , 'add']);
  }


  // navigateToPeoplePage() {
  //   this.routerNew.navigate(['company/job/people/' +  this.dataSource?.id + '/']);
  // }


}
