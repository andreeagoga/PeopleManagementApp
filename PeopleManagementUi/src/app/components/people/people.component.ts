import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { CompanyService } from 'src/app/services/company.service';

import { PeopleService } from 'src/app/services/people.service';
import { Company } from 'src/app/models/company';
import { People } from 'src/app/models/people';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  dataSource?:Job & {companyId: number};
  dataSourcePeople?:People[] = [];

  
  constructor(private serviceJob: JobService, private servicePeople: PeopleService, private route: Router, private routeActivated: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeActivated.params.subscribe((params) => {
      const jobId = params['id'] as number;
      const companyId = params['companyId'] as number;
      this.serviceJob.getJobById(companyId, jobId).subscribe((item: Job) => {
        this.dataSource = {...item, companyId};
        this.dataSourcePeople = item.people;
     
      });
    });
  }
  
  deleteItem(item: People){
    this.routeActivated.params.subscribe((params) => {
      const jobId = params['id'] as number;
      const companyId = params['companyId'] as number;
      console.log(params);
      this.servicePeople.deleteItem(item, companyId, jobId).subscribe(() => {
        this.dataSourcePeople = this.dataSourcePeople?.filter((newItem) => newItem.id != item.id)
      });
    });
  }

  navigateToAddPeoplePage() {
    this.route.navigate(['company/', this.routeActivated.snapshot.params['companyId'], 'job', this.dataSource?.id, 'people', 'add']);
  }

  navigateToEditPeoplePage() {
    // this.route.navigate(['company/', this.routeActivated.snapshot.params['companyId'], 'job', this.dataSource?.id, 'people', , 'edit']);
  }

  

  
}
