import { ArtisModel } from "./artist.model";

export interface TrackModel {
    name:string;
    album:string;
    cover:string;
    artist?:ArtisModel;
    url:string;
    _id:string | number;
}