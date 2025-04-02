
import { Component } from '@angular/core';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, MissionfilterComponent],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
})
export class MissionlistComponent {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];

  constructor(private spacexService: SpacexapiService, private router: Router) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(filters: any = {}): void {
    this.spacexService.getFilteredMissions(filters).subscribe((data) => {
      if (filters.land_success !== '' && filters.land_success !== null && filters.land_success !== undefined) {
        this.missions = data.filter((m: any) =>
          m.rocket?.first_stage?.cores?.some((c: any) =>
            String(c.land_success) === String(filters.land_success)
          )
        );
      } else {
        this.missions = data;
      }
      this.filteredMissions = this.missions;
    });
  }

  applyFilters(filters: any): void {
    this.loadMissions(filters);
  }

  openDetails(flightNumber: number): void {
    this.router.navigate(['/details', flightNumber]);
  }
}
