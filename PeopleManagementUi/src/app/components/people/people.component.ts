import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { CompanyService } from 'src/app/services/company.service';

import { PeopleService } from 'src/app/services/people.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  dataSource?:Job;

  
  constructor(private service: JobService, private serviceCompany: CompanyService, private route: Router, private routeActivated: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeActivated.params.subscribe((params) => {
      const id = params['id'] as number;
      const companyId = params['companyId'] as number;
      this.service.getJobById(companyId, id).subscribe((item: any) => {
        this.dataSource = item;
        console.log(item);
     
      });
    });
  }
      


  

  
}
