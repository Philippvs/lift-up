import {Component, OnInit} from '@angular/core';
import {EChartsOption} from "echarts";
import {NgxEchartsDirective} from "ngx-echarts";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
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
import {NgForOf} from "@angular/common";
import {MatCard} from "@angular/material/card";

interface Schedule {
    date: string;
    task: string;
    status: string;
}

interface Alert {
    timestamp: string;
    alert: string;
}


class Elevator {
    name: string
    chartOption: EChartsOption;
    maintenanceSchedules: Schedule[];
    alerts: Alert[]


    constructor(name: string, chartOption: EChartsOption, maintenanceSchedules: Schedule[], alerts: Alert[]) {
        this.name = name;
        this.chartOption = chartOption;
        this.maintenanceSchedules = maintenanceSchedules;
        this.alerts = alerts;
    }


}

@Component({
    selector: 'app-live-data',
    standalone: true,
    imports: [
        NgxEchartsDirective,
        MatTab,
        MatTabGroup,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatHeaderRow,
        MatRow,
        MatCellDef,
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatRowDef,
        NgForOf,
        MatCard
    ],
    templateUrl: './live-data.component.html',
    styleUrl: './live-data.component.css'
})
export class LiveDataComponent implements OnInit {

    public elevators: Elevator[] = []


    displayedColumns = ['date', 'task', 'status'];
    displayedColumnsAlerts = ['timestamp', 'alert'];


    ngOnInit() {
        const startDate = new Date('2024-06-19');
        const days = 10;
        const hoursBack = 24; // 24 hours back from start date
        const count = 5;
        this.elevators.push(new Elevator("elevator1", this.generateRandomData(5), this.generateMaintenanceSchedules(startDate, days), this.generateAlerts(startDate, hoursBack, count)))
        this.elevators.push(new Elevator("elevator2", this.generateRandomData(6), this.generateMaintenanceSchedules(startDate, days), this.generateAlerts(startDate, hoursBack, count)))
        this.elevators.push(new Elevator("elevator2", this.generateRandomData(7), this.generateMaintenanceSchedules(startDate, days), this.generateAlerts(startDate, hoursBack, count)))
    };

    private generateRandomData(seed: number): EChartsOption {

        // Seeded random number generator
        function seededRandom(seed: number) {
            let m = 0x80000000;
            let a = 1103515245;
            let c = 12345;
            let state = seed ? seed : Math.floor(Math.random() * (m - 1));

            return function () {
                state = (a * state + c) % m;
                return state / (m - 1);
            }
        }

        const xAxisData = [];
        const data1 = [];


        const random = seededRandom(seed);  // Initialize the seeded random number generator

        for (let i = 0; i < 100; i++) {
            xAxisData.push('category' + i);
            data1.push(random() * 100);  // Generating seeded random data for data1
        }

        return {
            legend: {
                data: ['bar', 'bar2'],
                align: 'left',
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false,
                },
            },
            yAxis: {},
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    data: data1,
                    animationDelay: idx => idx * 10,
                },
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: idx => idx * 5,
        }
    }

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
