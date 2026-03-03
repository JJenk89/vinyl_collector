export type DiscogsTrack = {
    position: string;
    title: string;
    duration: string;
}

export type DiscogsArtist = {
    name: string;
    anv?: string;
    join?: string;
    role?: string;
    tracks?: string;
    id?: number;
    resource_url?: string;
}

 export type DiscogsRelease = {
    id: number;
    title: string;
    artists?: DiscogsArtist[];
    artist?: string;
    label?: string;
    labels?: discogLabel[];
    year?: number;
    released?: string;
    country?: string;
    genres?: string[];
    styles?: string[];
    tracklist?: DiscogsTrack[];
    images?: {
        type: string;
        uri: string;
        resource_url: string;
        uri150: string;
        width: number;
        height: number;
    }[];
    thumb?: string;
    cover_image?: string;
    format?: string[];
    formats?: {
        name: string;
        qty: string;
        descriptions?: string[];
    }[];
    uri?: string;
    resource_url?: string;
}

export type discogLabel = {
    name: string;
    catno: string;
    id: number;
    resource_url: string;
}