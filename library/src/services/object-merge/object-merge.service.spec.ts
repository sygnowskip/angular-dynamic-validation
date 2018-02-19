import { TestBed, inject } from "@angular/core/testing";
import { ObjectMergeService } from "./object-merge.service";

describe('ServerErrorReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectMergeService]
    });
  });

  it('should be created', inject([ObjectMergeService], (service: ObjectMergeService) => {
    expect(service).toBeTruthy();
  }));

  describe('deepMerge tests', () => {
    it('should empty objects for two undefined objects', inject([ObjectMergeService], (service: ObjectMergeService) => {
      const merged = service.deepMerge(undefined, undefined);

      expect(merged).toBeDefined();
    }));

    it('should object that are merge of two objects', inject([ObjectMergeService], (service: ObjectMergeService) => {
      const objectLeft = {
        first: 1,
        second: 2
      };
      const objectRight = {
        third: 3
      };
      const merged = service.deepMerge(objectLeft, objectRight);

      expect(merged).toBeDefined();
      expect(merged.first).toEqual(1);
      expect(merged.third).toEqual(3);
    }));

    it('should object that are merge of two objects with overwritten properties', inject([ObjectMergeService], (service: ObjectMergeService) => {
      const objectLeft = {
        first: 1,
        second: 2
      };
      const objectRight = {
        second: 4,
        third: 3
      };
      const merged = service.deepMerge(objectLeft, objectRight);

      expect(merged).toBeDefined();
      expect(merged.first).toEqual(1);
      expect(merged.second).toEqual(4);
      expect(merged.third).toEqual(3);
    }));
  });
});
