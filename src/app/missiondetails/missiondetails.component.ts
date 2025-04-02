
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
})
export class MissiondetailsComponent {
  mission!: Mission;

  constructor(private route: ActivatedRoute, private router: Router, private spacexService: SpacexapiService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spacexService.getMissionByFlightNumber(id).subscribe((data) => (this.mission = data));
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
