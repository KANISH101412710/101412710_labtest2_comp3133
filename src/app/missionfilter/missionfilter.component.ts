import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent {
  @Output() filterChange = new EventEmitter<any>();

  filters = {
    launch_year: '',
    launch_success: '',
    land_success: ''
  };

  launchYears: number[] = [];

  ngOnInit(): void {
    this.launchYears = Array.from({ length: 15 }, (_, i) => 2006 + i);
  }

  applyFilters() {
    this.filterChange.emit(this.filters);
  }

  resetFilters() {
    this.filters = {
      launch_year: '',
      launch_success: '',
      land_success: ''
    };
    this.applyFilters();
  }
}
