import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import CarService from '../../../src/Services/CarService';
import {
  carOutput, carInput, carOutputId,
  carOutputIdAjust, carOutputStatusFalse, carInputWithoutStatus,
  carArrayOutputId, carArrayOutputIdAjust,
} from '../../car.mock';

describe('Deveria criar um carro', function () {
  it('Deveria criar um carro com SUCESSO', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.createCar(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria criar um carro com SUCESSO sem enviar status', async function () {
    sinon.stub(Model, 'create').resolves(carOutputStatusFalse);

    const service = new CarService();
    const result = await service.createCar(carInputWithoutStatus);

    expect(result).to.be.deep.equal(carOutputStatusFalse);
  });
  it('Retorna todos os carros cadastrados', async function () {
    sinon.stub(Model, 'find').resolves(carArrayOutputId);

    const service = new CarService();
    const result = await service.findAllCars();

    expect(result).to.be.deep.equal(carArrayOutputIdAjust);
  });

  it('Deveria buscar um carro pelo id com sucesso', async function () {
    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.findCarById('63776ded12654d2053a32382');

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Buscar um carro pelo id inexistente ', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const result = await service.findCarById('63776ded12654d2053a32364');

    expect(result).to.be.deep.equal(null);
  });

  it('Buscar um carro com id em formato incorreto ', async function () {
    try {
      const service = new CarService();
      await service.findCarById('63776ded12654d2053a32364XX');
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal('Invalid Mongo id');
    }
  });

  it('Atualiza um carro pelo id com sucesso ', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutputId);

    const service = new CarService();
    const result = await service.updateCar('63776ded12654d2053a32382', carInput);

    expect(result).to.be.deep.equal(carOutputIdAjust);
  });

  it('Atualiza um carro pelo id inexistente ', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const service = new CarService();
    const result = await service.updateCar('63776ded12654d2053a32387', carInput);

    expect(result).to.be.deep.equal(undefined);
  });

  it('Atualiza um carro com id em formato incorreto ', async function () {
    try {
      const service = new CarService();
      await service.updateCar('63776ded12654d2053a32364XX', carInput);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal('Invalid Mongo id');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});