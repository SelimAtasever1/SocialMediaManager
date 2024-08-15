export class LinkModel {
    public id?: string;  // Optional because new records might not have an id yet
    public socialMediaLink: string;
    public platformName: string;
    public description: string;

    constructor(socialMediaLink: string, platformName: string, description: string, id?: string) {
        this.socialMediaLink = socialMediaLink;
        this.platformName = platformName;
        this.description = description;
        this.id = id; // Initialize id if provided
    }
}
