import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/job';
import { People } from 'src/app/models/people';
import { Skill } from 'src/app/models/skill';
import { PeopleService } from 'src/app/services/people.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  dataSource?: People;
  dataSourceSkill?: Skill [] = [];

  
  constructor(private servicePeople: PeopleService, private serviceSkill: SkillService, private route: Router, private routeActivated: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeActivated.params.subscribe((params) => {
      const jobId = params['jobId'] as number;
      const companyId = params['companyId'] as number;
      const peopleId = params['peopleId'] as number;
      this.servicePeople.getPeopleById(companyId, jobId, peopleId).subscribe((item: People) => {
        this.dataSource = item;
        this.dataSourceSkill = item.skills;
     
      });
    });
  }
  
  deleteItem(item: Skill){
    this.routeActivated.params.subscribe((params) => {
      const jobId = params['jobId'] as number;
      const companyId = params['companyId'] as number;
      const peopleId = params['peopleId'] as number;
      console.log(params);
      this.serviceSkill.deleteItem(item, companyId, jobId, peopleId).subscribe(() => {
        this.dataSourceSkill = this.dataSourceSkill?.filter((newItem) => {
          newItem.id != item.id;
        console.log(typeof item.id);
        }
        )
      });
    });
  }

  navigateToAddSkillPage() {
    this.route.navigate(['company/', this.routeActivated.snapshot.params['companyId'], 'job', this.routeActivated.snapshot.params['jobId'], 'people', this.routeActivated.snapshot.params['peopleId'], 'skill', 'add']);
  }

  // navigateToEditPeoplePage() {
  //   this.route.navigate(['company/', this.routeActivated.snapshot.params['companyId'], 'job', this.dataSource?.id, 'people', , 'edit']);
  // }

  

  
}
