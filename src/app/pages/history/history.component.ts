import {Component} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgForOf, NgIf} from "@angular/common";
import {NgxEchartsDirective} from "ngx-echarts";
import {Alert, Elevator, Schedule} from "../live-data/live-data.component";

@Component({
    selector: 'app-history',
    standalone: true,
    imports: [
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatRow,
        MatRowDef,
        MatTab,
        MatTabGroup,
        MatTable,
        NgForOf,
        NgIf,
        NgxEchartsDirective,
        MatHeaderCellDef
    ],
    templateUrl: './history.component.html',
    styleUrl: './history.component.css'
})
export class HistoryComponent {
    public elevators: Elevator[] = []


    displayedColumns = ['date', 'task', 'status'];
    displayedColumnsAlerts = ['timestamp', 'alert'];


    ngOnInit() {
        const startDate = new Date('2024-04-19');
        const days = 10;
        const hoursBack = 24; // 24 hours back from start date
        const count = 5;
        this.elevators.push(new Elevator("elevator1", null, this.generateMaintenanceSchedules(startDate, days), this.generateAlerts(startDate, hoursBack, count), "active"))
        this.elevators.push(new Elevator("elevator2", null, this.generateMaintenanceSchedules(startDate, days), this.generateAlerts(startDate, hoursBack, count), "faulted"))
        this.elevators.push(new Elevator("elevator3", null, this.generateMaintenanceSchedules(startDate, days), this.generateAlerts(startDate, hoursBack, count), "faulted"))
    };

    private generateMaintenanceSchedules = (startDate: Date, days: number): Schedule[] => {
        const tasks = ['Inspection', 'Repair', 'Oil Change'];
        const statuses = ['Pending', 'Completed'];
        const schedules: Schedule[] = [];

        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const task = tasks[Math.floor(Math.random() * tasks.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            schedules.push({
                date: date.toISOString().split('T')[0],
                task,
                status,
            });
        }

        return schedules;
    };

    private generateAlerts = (startDate: Date, hoursBack: number, count: number): Alert[] => {
        const alertMessages = [
            'Engine check required',
            'Oil level low',
            'Brake inspection due',
            'Tire pressure low',
            'Battery replacement needed'
        ];
        const alerts: Alert[] = [];

        for (let i = 0; i < count; i++) {
            const date = new Date(startDate);
            date.setHours(startDate.getHours() - i * (hoursBack / count));

            const alert = alertMessages[Math.floor(Math.random() * alertMessages.length)];

            alerts.push({
                timestamp: date.toISOString(),
                alert
            });
        }

        return alerts;
    };

}
