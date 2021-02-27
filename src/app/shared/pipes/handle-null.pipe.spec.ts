import { HandleNullPipe } from './handle-null.pipe';

describe('HandleNullPipe', () => {
  it('create an instance', () => {
    const pipe = new HandleNullPipe();
    expect(pipe).toBeTruthy();
  });
  it('returns the string if a string is passed', () => {
    const pipe = new HandleNullPipe();
    expect(pipe.transform('test')).toBe('test');
  });
  it('returns placeholder if falsy object is passed', () => {
    const pipe = new HandleNullPipe();
    expect(pipe.transform('')).toBe('-');
    expect(pipe.transform(undefined)).toBe('-');
  });
});
