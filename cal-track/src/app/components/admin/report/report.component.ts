import { Component } from '@angular/core';
import { UserAggregate } from 'src/app/models/report.models';
import { ReportService } from 'src/app/services/report.service';

function getDate(daysToAdd: number = 0) {
  var d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  return d;
}

@Component({
  selector: 'ct-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  userAggregate: UserAggregate[] = [];
  dayCount: any = { currentWeek: 0, lastWeek: 0 };
  currentWeek = { start: +getDate(-7), end: +getDate() };
  lastWeek = {
    start: +getDate(-14),
    end: +getDate(-7),
  };

  constructor(private reportSvc: ReportService) {
    this.loadDayCount();
    this.loadUserAggregate();
  }

  loadDayCount() {
    this.reportSvc.getEntriesByDay().subscribe((data) => {
      data.forEach((d) => {
        const date = +new Date(d.date);
        if (this.currentWeek.start <= date && date <= this.currentWeek.end) {
          this.dayCount.currentWeek += d.count;
        } else if (this.lastWeek.start <= date && date <= this.lastWeek.end) {
          this.dayCount.lastWeek += d.count;
        }
      });
    });
  }

  loadUserAggregate() {
    this.reportSvc.getUserAggregate().subscribe((data) => {
      this.userAggregate = data;
    });
  }
}
