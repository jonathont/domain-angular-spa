
import { AuctionSchedule, InspectionSchedule } from "../types/listing";
import { daysAsMinutes, getDateTimeString } from "./dateTimeHelper";

export const getRandomListedDate = (): string => {
    return getDateTimeString(
        getRandomDate(new Date(), daysAsMinutes(-20), 0) // Up to 20 days in the past
    );
}

export const getRandomInspectionAndAuctionSchedules = () : {
    inspectionSchedule: InspectionSchedule | undefined,
    auctionSchedule: AuctionSchedule | undefined
} => {
    const rand = randomInt(1, 4);
    // 1 no inspections or auction, 2 inspect only, 3 inspect and auction, 4 auction only
    const hasInspectionSchedule = rand  > 1 && rand < 4;
    const hasAuctionSchedule = rand > 2;

    const inspectionSchedule = hasInspectionSchedule ? getInspectionSchedule() : undefined;
    const lastInspectionTime = hasInspectionSchedule && inspectionSchedule?.times && inspectionSchedule.times.length > 0
        ? inspectionSchedule.times[inspectionSchedule.times.length - 1].closingTime
        : undefined;

    const auctionSchedule = hasAuctionSchedule && lastInspectionTime
        ? getAuctionSchedule(new Date(lastInspectionTime))
        : undefined;

    return {
        inspectionSchedule: inspectionSchedule,
        auctionSchedule: auctionSchedule
    }
}

const getInspectionSchedule = () : InspectionSchedule => {
    // get 1-3 inspection times
    const inspectionCount = randomInt(1, 3);

    const inspectionSchedule: InspectionSchedule = {
        byAppointment: false,
        recurring: false,
        times: []
    };

    let baseDate = new Date();
    for (let i = 0; i < inspectionCount; i++) {
        // get random date for opening date
        const openingDate = getRandomDateAndTime(baseDate, 60, daysAsMinutes(7));

        // create copy for closing and add 30 minutes
        const closingDate = new Date(openingDate);
        closingDate.setMinutes(closingDate.getMinutes() + 30);

        // convert both to strings and push on to times array
        inspectionSchedule.times.push({
            openingTime: getDateTimeString(openingDate),
            closingTime: getDateTimeString(closingDate)
        })

        // set base date for next loop
        baseDate = closingDate;
    }

    return inspectionSchedule;
}

const getAuctionSchedule = (baseDate: Date) : AuctionSchedule => {
    return  {
        time: getDateTimeString(baseDate), // 2022-03-18T19:46:23
        auctionLocation: ""
    }
}

const setRandomTime = (date: Date) : Date => {
    const rand = randomInt(1, 3);

    switch (rand) {
        case 1:
            date.setHours(10);
            date.setMinutes(0);
            break;
        case 2:
            date.setHours(12);
            date.setMinutes(15);
            break;
        case 3:
            date.setHours(14);
            date.setMinutes(30);
            break;
        default:
            date.setHours(9);
            date.setMinutes(0);
    }

    return date;
}

const getRandomDateAndTime = (baseDate: Date, minMinuteOffset: number, maxMinuteOffset: number) => {
    return setRandomTime(getRandomDate(baseDate, minMinuteOffset, maxMinuteOffset));
}

const getRandomDate = (baseDate: Date, minMinuteOffset: number, maxMinuteOffset: number): Date => {
    const date = new Date(baseDate);
    const randomMinutes = randomInt(minMinuteOffset, maxMinuteOffset);
    date.setMinutes(date.getMinutes() + randomMinutes);

    return date;
}

const randomInt = (min: number, max: number) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}