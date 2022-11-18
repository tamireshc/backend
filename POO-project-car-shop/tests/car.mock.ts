import ICar from '../src/Interfaces/ICar';
import Car from '../src/Domains/Car';

export const carInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

export const carInputWithoutStatus: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

export const carOutput: Car = new Car({
  id: '63776ded12654d2053a32382',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
});

export const carOutputStatusFalse: Car = new Car({
  id: '63776ded12654d2053a32382',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: false,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
});

export const carOutputId = {
  _id: '63776ded12654d2053a32382',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};
export const carOutputIdAjust = {
  id: '63776ded12654d2053a32382',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

export const carArrayOutputId = [
  {
    _id: '63776ded12654d2053a32382',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    _id: '63776ded12654d2053a32384',
    model: 'Palio',
    year: 2010,
    color: 'Black',
    status: true,
    buyValue: 20.990,
    doorsQty: 4,
    seatsQty: 5,
  },
];

export const carArrayOutputIdAjust = [
  {
    id: '63776ded12654d2053a32382',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '63776ded12654d2053a32384',
    model: 'Palio',
    year: 2010,
    color: 'Black',
    status: true,
    buyValue: 20.990,
    doorsQty: 4,
    seatsQty: 5,
  },
];