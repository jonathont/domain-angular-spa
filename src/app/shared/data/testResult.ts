import DomainListingWrapper, { DomainListingWithStops } from "../types/listing";

export default JSON.parse(`{
    "type": "PropertyListing",
    "closestStops": [],
    "listing": {
        "listingType": "Sale",
        "id": 2017637870,
        "advertiser": {
            "type": "Agency",
            "id": 6525,
            "name": " Jellis Craig & Company Pty Ltd",
            "logoUrl": "https://images.domain.com.au/img/Agencys/6525/logo_6525.GIF",
            "preferredColourHex": "#1c252e",
            "bannerUrl": "https://images.domain.com.au/img/Agencys/6525/banner_6525.GIF",
            "contacts": [{
                "name": "David Macmillan",
                "photoUrl": "https://images.domain.com.au/img/6525/contact_1150952.JPG?mod=220310-094653"
            }, {
                "name": "Xen Blaher",
                "photoUrl": "https://images.domain.com.au/img/6525/contact_1150951.jpeg?mod=220309-083015"
            }]
        },
        "priceDetails": {
            "displayPrice": "$590,000 - $620,000"
        },
        "media": [{
            "category": "Image",
            "url": "https://bucket-api.domain.com.au/v1/bucket/image/2017637870_1_1_220303_055251-w1600-h1067"
        }, {
            "category": "Image",
            "url": "https://bucket-api.domain.com.au/v1/bucket/image/2017637870_2_1_220303_055251-w1600-h1067"
        }, {
            "category": "Image",
            "url": "https://bucket-api.domain.com.au/v1/bucket/image/2017637870_3_1_220303_055251-w1600-h1067"
        }, {
            "category": "Image",
            "url": "https://bucket-api.domain.com.au/v1/bucket/image/2017637870_4_1_220303_055251-w1600-h1067"
        }, {
            "category": "Image",
            "url": "https://bucket-api.domain.com.au/v1/bucket/image/2017637870_5_1_220303_055251-w1600-h1067"
        }],
        "propertyDetails": {
            "state": "VIC",
            "features": ["Floorboards", "Gas", "GroundFloor", "NorthFacing", "Intercom", "Heating"],
            "propertyType": "ApartmentUnitFlat",
            "allPropertyTypes": ["ApartmentUnitFlat"],
            "bathrooms": 1.0,
            "bedrooms": 2.0,
            "carspaces": 1,
            "unitNumber": "5",
            "streetNumber": "3",
            "street": "Osborne Avenue",
            "area": "Boroondara City Council - Greater Area",
            "region": "Eastern Suburbs",
            "suburb": "GLEN IRIS",
            "postcode": "3146",
            "displayableAddress": "5/3 Osborne Avenue, Glen Iris",
            "latitude": -37.8579,
            "longitude": 145.046265,
            "isRural": false,
            "isNew": false,
            "tags": []
        },
        "headline": "Peaceful and private in lifestyle location",
        "summaryDescription": "<b></b><br />Take a confident first step, invest for success or enjoy the convenience of a secure CBD base with this north facing ground floor apartment just minutes from a range of lifestyle hotspots. Full of sunshine and leafy outlooks at the rear of...",
        "hasFloorplan": true,
        "hasVideo": false,
        "labels": [],
        "auctionSchedule": {
            "time": "2022-03-26T12:00:00",
            "auctionLocation": "On Site"
        },
        "dateListed": "2022-03-03T16:52:51",
        "inspectionSchedule": {
            "byAppointment": false,
            "recurring": false,
            "times": [{
                "openingTime": "2022-03-12T10:00:00",
                "closingTime": "2022-03-12T10:30:00"
            }, {
                "openingTime": "2022-03-17T13:00:00",
                "closingTime": "2022-03-17T13:30:00"
            }, {
                "openingTime": "2022-03-19T12:00:00",
                "closingTime": "2022-03-19T12:30:00"
            }, {
                "openingTime": "2022-03-24T13:00:00",
                "closingTime": "2022-03-24T13:30:00"
            }, {
                "openingTime": "2022-03-26T11:30:00",
                "closingTime": "2022-03-26T12:00:00"
            }]
        },
        "listingSlug": "5-3-osborne-avenue-glen-iris-vic-3146-2017637870"
    }
}`) as DomainListingWithStops;