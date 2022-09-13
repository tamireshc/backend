const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

describe('Teste de unidade do salesController', function () {
  const sale = [
    {
      productId: 2,
      quantity: 1
    },
    {
      productId: 1,
      quantity: 1
    }
  ]

  const saleData = [
    {
      date: "2022-09-12T13:25:46.000Z",
      productId: 1,
      quantity: 5
    }
  ]

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
  it('Utilizando a funcao createSales para add um venda', async function () {

    const res = {};
    const req = { body: sale };

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'createSales')
      .resolves({ type: null, message: { id: 1, itemsSold: sale } });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(201);

    expect(res.json).to.have.been.calledWith({
      id: 1,
      itemsSold: [
        {
          productId: 2,
          quantity: 1
        },
        {
          productId: 1,
          quantity: 1
        }
      ]

    })
  });

  it('Utilizando a funcao createSales para add um venda com id inexistente', async function () {

    const res = {};
    const req = { body: sale };

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'createSales')
      .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    await salesController.createSales(req, res);

    expect(res.status).to.have.been.calledWith(404);

    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Utilizando a funcao deleteSales para deletar uma venda ', async function () {
    // referencia https://stackoverflow.com/questions/47502851/res-status-not-a-function-when-trying-to-set-the-status-code

    const res = {
      end: function () { },
      sendStatus: function (s) { this.statusCode = s; return this; }
    };

    const req = { params: 1 };

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'deleteSale')
      .resolves({ type: null });

    await salesController.deleteSale(req, res);

    expect(res.statusCode).to.equal(204);

  });

  it('Utilizando a funcao deleteSales para deletar uma venda um id inexistente ', async function () {

    const res = {};

    const req = { params: 1 };

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'deleteSale')
      .resolves({ type: 'NOT_FOUND', message: 'Sale not found' });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);

    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });

  });


  it('Utilizando a funcao findSaleById para buscar uma venda com o id ', async function () {

    const res = {};

    const req = { params: 1 };

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'findSaleById')
      .resolves({ type: null, message: saleData });

    await salesController.findSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(saleData);

  });

  it('Utilizando a funcao findSaleById para buscar uma venda com o id inexistente', async function () {

    const res = {};

    const req = { params: 99 };

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'findSaleById')
      .resolves({ type: 'NOT_FOUND', message: 'Sale not found' });

    await salesController.findSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);

    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });

  });

  it('Utilizando a funcao listAllSales para buscar todas as vendas ', async function () {

    const res = {};

    const req = {};

    res.status = sinon.stub().returns(res);

    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'listAllSales')
      .resolves({ type: null, message: allSales });

    await salesController.listAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(allSales);

  });

  afterEach(sinon.restore);
});