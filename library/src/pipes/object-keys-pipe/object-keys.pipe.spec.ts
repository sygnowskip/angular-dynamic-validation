import { } from 'jasmine';
import { ObjectKeysPipe } from './object-keys.pipe';

describe('ObjectKeysPipe', () => {
  let pipe: ObjectKeysPipe;

  beforeEach(() => {
    pipe = new ObjectKeysPipe();
  });

  it('should empty array for empty object', () => {
    const object = { };

    const keys = pipe.transform(object);

    expect(keys).toBeDefined();
    expect(keys.length).toEqual(0);
  });

  it('should return all keys for object', () => {
    const object = {
      test: 1,
      test2: 2,
      test3: 3
    };

    const keys = pipe.transform(object);

    expect(keys).toBeDefined();
    expect(keys.length).toEqual(3);
  });
});
