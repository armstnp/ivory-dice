import { SweepGenerator } from '../../src/generators/sweep-generator.js';

const createGenerationWith = (min, max) => () => new SweepGenerator().generate(min, max);

describe('SweepGenerator', () => {
  describe('the generator usage contract', () => {
    it('should throw when given a non-numeric min', () => {
      expect(createGenerationWith('1', 2)).to.throw();
    });

    it('should throw when given a non-integer min', () => {
      expect(createGenerationWith(1.5, 2)).to.throw();
    });

    it('should throw when given a non-numeric max', () => {
      expect(createGenerationWith(1, '2')).to.throw();
    });

    it('should throw when given a non-integer max', () => {
      expect(createGenerationWith(1, 2.5)).to.throw();
    });
  });

  it('should return the minimum value as its first', () => {
    expect(new SweepGenerator().generate(1, 6)).to.equal(1);
  });

  it('should return successive values when multiple calls are made within the selected range', () => {
    let generator = new SweepGenerator();
    expect(generator.generate(1, 6)).to.equal(1);
    expect(generator.generate(1, 6)).to.equal(2);
    expect(generator.generate(1, 6)).to.equal(3);
  });

  it('should return successive values when the range start is greater than the range end', () => {
    let generator = new SweepGenerator();
    expect(generator.generate(6, 1)).to.equal(6);
    expect(generator.generate(6, 1)).to.equal(5);
    expect(generator.generate(6, 1)).to.equal(4);
  });

  it('should restart at the range start after reaching the range end', () => {
    let generator = new SweepGenerator();
    expect(generator.generate(1, 2)).to.equal(1);
    expect(generator.generate(1, 2)).to.equal(2);
    expect(generator.generate(1, 2)).to.equal(1);
  });

  it('should only produce one value when range start equals range end', () => {
    let generator = new SweepGenerator();
    expect(generator.generate(1, 1)).to.equal(1);
    expect(generator.generate(1, 1)).to.equal(1);
    expect(generator.generate(1, 1)).to.equal(1);
  });

  it('should reset its count when start and end range are changed', () => {
    let generator = new SweepGenerator();
    expect(generator.generate(1, 6)).to.equal(1);
    expect(generator.generate(1, 6)).to.equal(2);
    expect(generator.generate(1, 7)).to.equal(1);
    expect(generator.generate(1, 7)).to.equal(2);
  });
});
