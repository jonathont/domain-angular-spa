import { TestBed } from '@angular/core/testing';
import { StopsService } from './stops.service';

describe('StopsService', () => {
    let service: StopsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StopsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should calculate distance from lat/lon', () => {
        expect(service.getDistanceFromLatLonInKm(-37.8193321,145.151535,-37.82007,145.150009)).toBeCloseTo(0.15715969601379445);
    });

    it('Should find a nearest stop', () => {
        let closestStops = service.findClosestStops(-38.0806122, 145.486374);
        expect(closestStops).not.toBeNull();
        expect(closestStops[0]).not.toBeUndefined();
        expect(closestStops[0].stop_name).toBe('Pakenham Station');
    });
});
