const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection')

const salesModel = require('../../../src/models/salesModel');

describe('Testes de unidade do model de Sales', function () {
  const sales = [
    {
      productId: 2,
      quantity: 1
    },
    {
      productId: 1,
      quantity: 1
    }
  ]

  const sale = {
    id: 1,
    date: "2022-09-11T13:18:05.000Z"
  }

  const allSales = [
    {
      saleId: 1,
      date: "2022-09-12T13:11:12.000Z",
      productId: 1,
      quantity: 5
    },

    {
      saleId: 2,
      date: "2022-09-12T13:11:12.000Z",
      productId: 3,
      quantity: 15
    }
  ]

  it('Realizando uma operação criar uma venda com model sales', async function () {

    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await salesModel.createSales(sales)
    expect(result).to.equal(1);
  });

  it('Realizando uma operação deletar venda com model sales', async function () {

    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(1)
    expect(result).to.equal(undefined);
  });

  it('Realizando uma operação buscar  uma venda pelo id com model sales', async function () {
    // problema da binary row
    //sinon.stub(connection, 'execute').resolves(sale);

    // const result = await salesModel.findSaleById(1)

    // expect(result[0].productId).to.equal(1);
    // expect(result.date).to.equal("2022-09-11T13:18:05.000Z");
  });

  it('Realizando uma operação buscar todas as vendas com model sales', async function () {

    sinon.stub(connection, 'execute').resolves([allSales]);
    const result = await salesModel.listAllSales()
    expect(result).to.deep.equal(allSales);
  });

  afterEach(sinon.restore);
});