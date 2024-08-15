import { Component, TemplateRef, ViewChild, Inject } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiDialogFormService } from '@taiga-ui/kit';
import { LinkModel } from 'src/app/shared/models/link-model';
import { TuiAlertService } from '@taiga-ui/core';
import { LinkService } from 'src/app/shared/services/link.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-link-form',
    templateUrl: './link-form.component.html',
    styleUrls: ['./link-form.component.scss'],
    providers: [TuiDialogFormService],
})
export class LinkFormComponent {
    @ViewChild('content') content!: TemplateRef<any>;
    private editLinkSubscription: Subscription;

    socialMediaLink: string = '';
    platformName: string = '';
    description: string = '';
    isDialogOpen: boolean = false;
    dialogInstance: any;
    value = '';
    isEditMode: boolean = false;
    currentLink: LinkModel | null = null;
    @ViewChild('linkInput') linkInput!: NgModel;
    @ViewChild('nameInput') nameInput!: NgModel;
    @ViewChild('nameDescription') nameDescription!: NgModel;
    notificationShown: boolean = false; // Flag kullanıldı, dialog iki kere cagırılmasın diye.

    constructor(
        @Inject(TuiDialogFormService) private readonly dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        private linkService: LinkService,
        @Inject(TuiAlertService) private readonly alerts: TuiAlertService
    ) {
        this.editLinkSubscription = this.linkService.editLink$.subscribe((link) => {
            if (link) {
                this.editLink(link);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.editLinkSubscription) {
            this.editLinkSubscription.unsubscribe();
        }
    }

    addNewLink() {
        const linkInputValid = this.linkInput.valid;
        const nameInputValid = this.nameInput.valid;
        const nameDescriptionValid = this.nameDescription.valid;

        if (!linkInputValid || !nameInputValid || !nameDescriptionValid) {
            if (!this.notificationShown) {
                this.showNotification('Hata', 'Tüm alanları doldurunuz.', 'error');
                this.notificationShown = true; // Set flag to true
            }
            return;
        }
      
        const link = new LinkModel(this.socialMediaLink, this.platformName, this.description, this.currentLink?.id);
      
        if (this.isEditMode && this.currentLink?.id) {
          this.linkService.UpdateRecord(this.currentLink.id, link).subscribe({
            next: () => this.showNotification('İşlem Başarılı', 'Link güncellendi!'),
            error: () => this.showNotification('Hata', 'Güncelleme başarısız.', 'error')
          });
        } else {
          this.linkService.CreateNewRecord(link).subscribe({
            next: () => this.showNotification('İşlem Başarılı', 'Yeni link eklendi!'),
            error: () => this.showNotification('Hata', 'Link eklenemedi.', 'error')
          });
        }
      
        this.resetForm();
        this.closeDialog();
      }
      

    editLink(existingLink: LinkModel) {
        this.socialMediaLink = existingLink.socialMediaLink;
        this.platformName = existingLink.platformName;
        this.description = existingLink.description;
        this.currentLink = existingLink;
        this.isEditMode = true;
        this.openDialog();
    }

    onModelChange(value: string): void {
        this.value = value;
        this.dialogForm.markAsDirty();
    }

    showNotification(message: string, label: string, status: 'success' | 'error' = 'success'): void {
        this.alerts.open(message, { label, status, autoClose: true }).subscribe();
    }

    onClick(): void {
        if (this.isDialogOpen) return;
        this.openDialog();
    }

    private openDialog(): void {
        if (!this.content) return;

        this.isDialogOpen = true;
        this.dialogForm.markAsPristine();

        const closeable = this.dialogForm.withPrompt({
            label: 'Emin misiniz?',
            data: {
                content: 'Verileriniz <strong>kaybolacak</strong>',
            }
        });

        this.dialogInstance = this.dialogs.open(this.content, { closeable, dismissible: closeable }).subscribe({
            complete: () => {
                this.resetForm();
                this.isDialogOpen = false;
            },
        });
    }

    closeDialog(): void {
        if (this.dialogInstance) {
            this.dialogInstance.unsubscribe();
            this.isDialogOpen = false;
        }
    }

    private resetForm() {
        this.socialMediaLink = '';
        this.platformName = '';
        this.description = '';
        this.isEditMode = false;
        this.currentLink = null;
    }
}
