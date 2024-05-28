import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private readonly archivedSlugsKey = 'archived_listings';
    

    saveArchived(archived: string[]) {
        localStorage.setItem(this.archivedSlugsKey, JSON.stringify(archived));
    }

    getArchived(): string[] {
        return JSON.parse(localStorage.getItem(this.archivedSlugsKey) ?? '[]') ?? [];
    }

}
