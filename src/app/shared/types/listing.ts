export interface Contact {
    name: string;
    photoUrl?: string;
}

export interface Advertiser {
    type: string;
    id: number;
    name: string;
    logoUrl?: string;
    preferredColourHex: string;
    bannerUrl?: string;
    contacts: Contact[];
}

export interface PriceDetails {
    displayPrice: string;
}

export interface Medium {
    category: string;
    url: string;
}

export interface PropertyDetails {
    state: string;
    features: any[];
    propertyType: string;
    allPropertyTypes: string[];
    bathrooms: number;
    bedrooms: number;
    carspaces: number;
    unitNumber: string;
    streetNumber: string;
    street: string;
    area: string;
    region: string;
    suburb: string;
    postcode: string;
    displayableAddress: string;
    latitude: number;
    longitude: number;
}

export interface AuctionSchedule {
    time: string; //TODO this was a Date type
    auctionLocation: string;
}

export interface Time {
    openingTime: string; //TODO this was a Date type
    closingTime: string; //TODO this was a Date type
}

export interface InspectionSchedule {
    byAppointment: boolean;
    recurring: boolean;
    times: Time[];
}

export interface Listing {
    listingType: string;
    id: number;
    advertiser: Advertiser;
    priceDetails: PriceDetails;
    media: Medium[];
    propertyDetails: PropertyDetails;
    headline: string;
    summaryDescription: string;
    hasFloorplan: boolean;
    hasVideo: boolean;
    labels: string[];
    auctionSchedule?: AuctionSchedule;
    inspectionSchedule?: InspectionSchedule;
    listingSlug: string;
    dateListed: string;
}

export interface NearbyStop {
    stop_name: string;
    distance: number;
    latitude: number;
    longitude: number;
    bearing: number;
}

export interface DomainListingWithStops extends DomainListingWrapper {
    closestStops: Array<NearbyStop>;
}

export default interface DomainListingWrapper {
    type: string;
    listing: Listing;
}