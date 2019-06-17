export class User {
    id: string;
    name: string;
    email: string;
    photoURL: string;
    provider: string;
    savedPlaces: string[];
    savedLocations: string[];

    constructor(id, name, email, photoUrl, provider, savedPlaces, savedLocations) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.photoURL = photoUrl;
        this.provider = provider;
        this.savedLocations = [];
        this.savedPlaces = [];
    }
}