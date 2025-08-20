import { isNumber } from '@sniptt/guards';
import type { RawValue } from './format.types';
import {
  numeric,
  plural,
} from './index';

type Variant = 'Symbol' | 'Long' | 'Short';

type Unit =
  | 'millimeters' // миллиметры
  | 'centimeters' // сантиметры
  | 'meters' // метры
  | 'kilometers' // километры
  | 'millimeters2' // квадратные миллиметры
  | 'centimeters2' // квадратные сантиметры
  | 'meters2' // квадратные метры
  | 'kilometers2' // квадратные километры
  | 'millimeters3' // кубические миллиметры
  | 'centimeters3' // кубические сантиметры
  | 'meters3' // кубические метры
  | 'milligrams' // миллиграммы
  | 'grams' // граммы
  | 'kilograms' // килограммы
  | 'tons' // тонны
  | 'milliliters' // миллилитры
  | 'liters'; // литры

const RESOLVER: Record<Unit, (value: number, variant: Variant) => string> = {
  millimeters: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0мм`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'миллиметр',
        few: 'миллиметра',
        many: 'миллиметров',
      });
    }

    return '';
  },
  centimeters: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0см`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'сантиметр',
        few: 'сантиметра',
        many: 'сантиметров',
      });
    }

    return '';
  },
  meters: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0м`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'метр',
        few: 'метра',
        many: 'метров',
      });
    }

    return '';
  },
  kilometers: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0км`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'километр',
        few: 'километра',
        many: 'километров',
      });
    }

    return '';
  },
  millimeters2: (value, variant) => {
    if (variant === 'Symbol') {
      return `${numeric(value)}\xA0мм²`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'квадратный\xA0миллиметр',
        few: 'квадратных\xA0миллиметра',
        many: 'квадратных\xA0миллиметров',
      });
    }

    if (variant === 'Short') {
      return `${numeric(value)}\xA0кв.\xA0мм`;
    }

    return '';
  },
  centimeters2: (value, variant) => {
    if (variant === 'Symbol') {
      return `${numeric(value)}\xA0см²`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'квадратный\xA0сантиметр',
        few: 'квадратных\xA0сантиметра',
        many: 'квадратных\xA0сантиметров',
      });
    }

    if (variant === 'Short') {
      return `${numeric(value)}\xA0кв.\xA0см`;
    }

    return '';
  },
  meters2: (value, variant) => {
    if (variant === 'Symbol') {
      return `${numeric(value)}\xA0м²`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'квадратный\xA0метр',
        few: 'квадратных\xA0метра',
        many: 'квадратных\xA0метров',
      });
    }

    if (variant === 'Short') {
      return `${numeric(value)}\xA0кв.\xA0м`;
    }

    return '';
  },
  kilometers2: (value, variant) => {
    if (variant === 'Symbol') {
      return `${numeric(value)}\xA0км²`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'квадратный\xA0километр',
        few: 'квадратных\xA0километра',
        many: 'квадратных\xA0километров',
      });
    }

    if (variant === 'Short') {
      return `${numeric(value)}\xA0кв.\xA0км`;
    }

    return '';
  },
  millimeters3: (value, variant) => {
    if (variant === 'Symbol') {
      return `${numeric(value)}\xA0мм³`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'кубический\xA0миллиметр',
        few: 'кубических\xA0миллиметра',
        many: 'кубических\xA0миллиметров',
      });
    }

    if (variant === 'Short') {
      return `${numeric(value)}\xA0куб.\xA0мм`;
    }

    return '';
  },
  centimeters3: (value, variant) => {
    if (variant === 'Symbol') {
      return `${numeric(value)}\xA0см³`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'кубический\xA0сантиметр',
        few: 'кубических\xA0сантиметра',
        many: 'кубических\xA0сантиметров',
      });
    }

    if (variant === 'Short') {
      return `${numeric(value)}\xA0куб.\xA0см`;
    }

    return '';
  },
  meters3: (value, variant) => {
    if (variant === 'Symbol') {
      return `${numeric(value)}\xA0м³`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'кубический\xA0метр',
        few: 'кубических\xA0метра',
        many: 'кубических\xA0метров',
      });
    }

    if (variant === 'Short') {
      return `${numeric(value)}\xA0куб.\xA0м`;
    }

    return '';
  },
  milligrams: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0мг`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'миллиграмм',
        few: 'миллиграмма',
        many: 'миллиграммов',
      });
    }

    return '';
  },
  grams: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0г`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'грамм',
        few: 'грамма',
        many: 'граммов',
      });
    }

    return '';
  },
  kilograms: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0кг`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'килограмм',
        few: 'килограмма',
        many: 'килограммов',
      });
    }

    return '';
  },
  tons: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0т`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'тонна',
        few: 'тонны',
        many: 'тонн',
      });
    }

    return '';
  },
  milliliters: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0мл`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'миллилитр',
        few: 'миллилитра',
        many: 'миллилитров',
      });
    }

    return '';
  },
  liters: (value, variant) => {
    if (variant === 'Symbol' || variant === 'Short') {
      return `${numeric(value)}\xA0л`;
    }

    if (variant === 'Long') {
      return plural(value, {
        one: 'литр',
        few: 'литра',
        many: 'литров',
      });
    }

    return '';
  },
};

/**
 * Отобразить число с единицами измерения в соответствии с дизайн-системой
 * @param value - количество
 * @param unit - тип единицы измерения (метры, литры и т.д.)
 * @param variant - тип написания в соответствии с дизайн-системой
 *
 * @example
 * unit(1000, 'm3', 'Symbol'); // '1 000 м³'
 * unit(1000, 'm3', 'Long'); // '1 000 кубических метров'
 * unit(1000, 'm3', 'Short'); // '1 000 куб. м'
 */
export function unit(
  value: RawValue<number>,
  unit: Unit,
  variant: Variant = 'Symbol',
): string {
  if (!isNumber(value)) {
    return '';
  }

  return RESOLVER[unit](value, variant);
}
