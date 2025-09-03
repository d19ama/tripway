import IMask, {
  type FactoryConstructorOpts,
  type FactoryInstanceOpts,
  type FactoryStaticOpts,
  type MaskedPatternOptions,
} from 'imask';

type FactoryStaticOptionsWithoutLazy =
  | Exclude<FactoryStaticOpts, 'MaskedPatternOptions'>
  | Omit<Extract<FactoryStaticOpts, MaskedPatternOptions>, 'lazy' | 'eager'>;

type Mask =
  | FactoryConstructorOpts
  | FactoryInstanceOpts
  | FactoryStaticOptionsWithoutLazy;

export const maskDateSingle: Mask = {
  // https://imask.js.org/guide.html#masked-date
  mask: Date,
  autofix: true,
  blocks: {
    // eslint-disable-next-line id-length
    Y: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 2999,
      maxLength: 4,
    },
    // eslint-disable-next-line id-length
    m: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    // eslint-disable-next-line id-length
    d: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2,
    },
  },
};

export const maskDatePeriod: Mask = {
  mask: 'd.m.Y - d.m.Y',
  autofix: true,
  blocks: maskDateSingle.blocks,
};

export const maskPhone: Mask = {
  mask: '+{7} 000 000-00-00',
};

export const maskCarNumber: Mask = {
  // /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui,
  mask: 'L 000 LL 00[0]',
  definitions: {
    // eslint-disable-next-line id-length
    L: /[АВЕКМНОРСТУХавекмнорстух]/,
  },
};

export const maskNumber: Mask = {
  mask: Number,
  min: 0,
  scale: 0,
  thousandsSeparator: ' ',
};

export const maskPercentage: Mask = {
  mask: [
    {
      mask: '',
    },
    {
      mask: 'num%',
      lazy: false,
      blocks: {
        num: {
          mask: Number,
          scale: 0,
          min: 0,
          max: 100,
          radix: '.',
          mapToRadix: [
            ',',
          ],
        },
      },
    },
  ],
};
