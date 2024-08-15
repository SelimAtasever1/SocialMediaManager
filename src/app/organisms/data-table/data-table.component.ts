import { Component, Inject, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { LinkModel } from 'src/app/shared/models/link-model';
import { LinkService } from 'src/app/shared/services/link.service';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {

    private readonly dialogs = inject(TuiDialogService);

    linkRecords$: Observable<LinkModel[]>;
    private linkSubscription: Subscription;
    dataSource = new MatTableDataSource<LinkModel>();

    displayedColumns: string[] = ['socialMediaLink', 'platformName', 'description', 'actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private linkService: LinkService,
        @Inject(TuiAlertService) private readonly alerts: TuiAlertService
    ) { }

    ngOnInit(): void {
        this.linkSubscription = this.linkService.dataSource$.subscribe(profiles => {
            this.dataSource.data = profiles;
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onEdit(data: LinkModel): void {
        this.linkService.triggerEditLink(data);
    }

    onDelete(data: LinkModel): void {
        this.dialogs.open('Are you sure you want to delete this record?', {
            label: 'Confirm Delete',
            size: 's',
            closeable: false,
            dismissible: true
        }).subscribe({
            complete: () => {
                this.linkService.DeleteRecord(data.id!).subscribe({
                    next: () => {
                        this.showNotification('Record deleted successfully', 'Success', 'success');
                    },
                    error: () => this.showNotification('Failed to delete record', 'Error', 'error')
                });
            }
        });
    }

    showNotification(message: string, label: string, status: 'success' | 'error' = 'success'): void {
        this.alerts.open(message, { label, status, autoClose: true }).subscribe();
    }

    ngOnDestroy(): void {
        this.linkSubscription.unsubscribe();
    }
}

