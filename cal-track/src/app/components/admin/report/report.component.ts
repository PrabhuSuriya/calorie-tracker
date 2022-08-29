import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'ct-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  dayCount: any = { currentWeek: 0, lastWeek: 0 };
  currentWeek = { start: new Date().setDate(-7), end: +new Date() };
  lastWeek = {
    start: new Date().setDate(-14),
    end: new Date().setDate(-7),
  };
  constructor(private reportSvc: ReportService) {
    this.loadDayCount();
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

  ngOnInit(): void {}
}
