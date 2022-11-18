import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import MotorcycleService from '../../../src/Services/MotorcycleService';
import {
  motorcycleArrayOutputId,
  motorcycleArrayOutputIdAjust,
  motorcycleInput, motorcycleInputWithoutStatus, motorcycleOutput,
  motorcycleOutputStatusFalse,
} from '../../motorcycle.mock';

describe('Deveria criar um moto', function () {
  it('Deveria criar um moto com SUCESSO', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.createMotorcycle(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria criar uma moto com SUCESSO sem enviar status', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutputStatusFalse);

    const service = new MotorcycleService();
    const result = await service.createMotorcycle(motorcycleInputWithoutStatus);

    expect(result).to.be.deep.equal(motorcycleOutputStatusFalse);
  });

  it('Retorna todas as motos cadastradas', async function () {
    sinon.stub(Model, 'find').resolves(motorcycleArrayOutputId);

    const service = new MotorcycleService();
    const result = await service.findAllMotorcycle();

    expect(result).to.be.deep.equal(motorcycleArrayOutputIdAjust);
  });

  it('Deveria buscar uma moto pelo id com sucesso', async function () {
    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.findMotorcycleById('63776ded12654d2053a32382');

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Buscar uma moto pelo id inexistente ', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new MotorcycleService();
    const result = await service.findMotorcycleById('63776ded12654d2053a32364');

    expect(result).to.be.deep.equal(null);
  });

  it('Buscar uma moto com id em formato incorreto ', async function () {
    try {
      const service = new MotorcycleService();
      await service.findMotorcycleById('63776ded12654d2053a32364XX');
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal('Invalid Mongo id');
    }
  });

  it('Atualiza uma moto pelo id com sucesso ', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.updateMotorcycle('63776ded12654d2053a32382', motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Atualiza uma moto pelo id inexistente ', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    const service = new MotorcycleService();
    const result = await service.updateMotorcycle('63776ded12654d2053a32387', motorcycleInput);

    expect(result).to.be.deep.equal(undefined);
  });

  it('Atualiza um carro com id em formato incorreto ', async function () {
    try {
      const service = new MotorcycleService();
      await service.updateMotorcycle('63776ded12654d2053a32364XX', motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal('Invalid Mongo id');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});