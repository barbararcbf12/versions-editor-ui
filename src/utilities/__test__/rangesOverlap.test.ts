import { rangesOverlap } from "../rangesOverlap";


describe('rangesOverlap', () => {
  it('should return true for ranges that overlap partially', () => {
    const range1 = { start: '1.1.1', end: '2.2.2', inclusiveStart: true, inclusiveEnd: true };
    const range2 = { start: '2.0.0', end: '3.0.0', inclusiveStart: true, inclusiveEnd: true };

    expect(rangesOverlap(range1, range2)).toBe(true); // Overlaps from 2.0.0 to 2.2.2
  });

  it('should return true for ranges where one is fully contained within the other', () => {
    const range1 = { start: '1.1.1', end: '3.3.3', inclusiveStart: true, inclusiveEnd: true };
    const range2 = { start: '2.0.0', end: '2.2.2', inclusiveStart: true, inclusiveEnd: true };

    expect(rangesOverlap(range1, range2)).toBe(true); // range2 is fully within range1
    expect(rangesOverlap(range2, range1)).toBe(true); // range1 fully contains range2
  });

  it('should return false for ranges that do not overlap', () => {
    const range1 = { start: '1.1.1', end: '2.2.2', inclusiveStart: true, inclusiveEnd: true };
    const range2 = { start: '3.0.0', end: '4.0.0', inclusiveStart: true, inclusiveEnd: true };

    expect(rangesOverlap(range1, range2)).toBe(false); // No overlap between ranges
  });

  it('should return true for ranges with touching boundaries if inclusive', () => {
    const range1 = { start: '1.1.1', end: '2.2.2', inclusiveStart: true, inclusiveEnd: true };
    const range2 = { start: '2.2.2', end: '3.3.3', inclusiveStart: true, inclusiveEnd: true };

    expect(rangesOverlap(range1, range2)).toBe(true); // Touch at 2.2.2 inclusively
  });

  it('should return false for ranges with touching boundaries if exclusive', () => {
    const range1 = { start: '1.1.1', end: '2.2.2', inclusiveStart: true, inclusiveEnd: false };
    const range2 = { start: '2.2.2', end: '3.3.3', inclusiveStart: false, inclusiveEnd: true };

    expect(rangesOverlap(range1, range2)).toBe(false); // No overlap as boundaries are exclusive
  });

  it('should return true for ranges where one boundary overlaps the other range', () => {
    const range1 = { start: '1.1.1', end: '2.2.2', inclusiveStart: true, inclusiveEnd: true };
    const range2 = { start: '2.2.2', end: '3.3.3', inclusiveStart: true, inclusiveEnd: true };

    expect(rangesOverlap(range1, range2)).toBe(true); // Overlaps at the end of range1
  });

  it('should handle cases where one range starts or ends outside the other', () => {
    const range1 = { start: '1.0.0', end: '3.0.0', inclusiveStart: true, inclusiveEnd: true };
    const range2 = { start: '2.0.0', end: '4.0.0', inclusiveStart: true, inclusiveEnd: true };

    expect(rangesOverlap(range1, range2)).toBe(true); // Overlap from 2.0.0 to 3.0.0
  });
});
