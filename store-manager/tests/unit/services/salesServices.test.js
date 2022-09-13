const { expect } = require('chai');
const sinon = require('sinon');


const salesModel = require('../../../src/models/salesModel');
const productModel = require('../../../src/models/productsModel');

const salesService = require('../../../src/services/salesService')

describe('Testes de unidade do service de Sales', function () {
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

  const sale = [
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

  it('Utilizando a funcao createSales para add uma compra', async function () {

    sinon.stub(salesModel, 'createSales').resolves(1);
    const result = await salesService.createSales(sales)
    expect(result).to.deep.equal({ type: null, message: { id: 1, itemsSold: sales } });
  });

  it('Utilizando a funcao createSales para add uma compra com produto inexistente', async function () {

    sinon.stub(productModel, 'listAllProducts').resolves([
      {
        id: 1,
        name: "Martelo de Thor"
      }]);

    const result = await salesService.createSales(sales)
    expect(result).to.deep.equal({ type: 'NOT_FOUND', message: 'Product not found' });
  });

  it('Utilizando a funcao deleteSales para deletar uma sale ', async function () {

    sinon.stub(salesModel, 'findSaleById').resolves(sale);
    sinon.stub(salesModel, 'deleteSale').resolves();
    const result = await salesService.deleteSale(1)
    expect(result).to.deep.equal({ type: null });
  });

  it('Utilizando a funcao deleteSales para deletar uma sale com id inexistente ', async function () {

    sinon.stub(salesModel, 'findSaleById').resolves([]);
    sinon.stub(salesModel, 'deleteSale').resolves();

    const result = await salesService.deleteSale(99)
    expect(result).to.deep.equal({ type: 'NOT_FOUND', message: 'Sale not found' });
  });

  it('Utilizando a funcao findSaleById para buscar uma sale ', async function () {

    sinon.stub(salesModel, 'findSaleById').resolves(sale);
    const result = await salesService.findSaleById(1)
    expect(result).to.deep.equal({ type: null, message: sale });
  });

  it('Utilizando a funcao findSaleById para buscar uma sale com id inexistente', async function () {

    sinon.stub(salesModel, 'findSaleById').resolves([]);
    const result = await salesService.findSaleById(99)
    expect(result).to.deep.equal({ type: 'NOT_FOUND', message: 'Sale not found' });
  });

  it('Utilizando a funcao listAllSales para buscar todas as sales ', async function () {

    sinon.stub(salesModel, 'listAllSales').resolves(allSales);
    const result = await salesService.listAllSales()
    expect(result).to.deep.equal({ type: null, message: allSales });
  });


  afterEach(sinon.restore);
});