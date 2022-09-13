const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/serviceProcucts');
const productController = require('../../../src/controllers/productsController');

describe('Teste de unidade do productController', function () {
  mockProducts = [
    {
      id: 1,
      name: "Martelo de Thor"
    },
    {
      id: 2,
      name: "Traje de encolhimento"
    },
  ]
  it('Utilizando a funcao listAllProducts', async function () {

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'listAllProducts')
      .resolves(mockProducts);

    await productController.listAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProducts);
  });

  it('Utilizando a funcao findProductById', async function () {
    mockProducts =
    {
      id: 1,
      name: "Martelo de Thor"
    }

    const res = {};
    const req = { params: 1 };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'findProductById')
      .resolves({ type: null, message: mockProducts });

    await productController.findProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockProducts);
  });

  it('Utilizando a funcao findProductById para um produto inexistente', async function () {

    const res = {};
    const req = { params: 99 };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'findProductById')
      .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    await productController.findProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Utilizando a funcao createProduct para add um produto', async function () {

    const res = {};
    const req = { body: { name: "Martelo de Thor" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'createProduct')
      .resolves({ type: null, message: { id: 1, name: "Martelo de Thor" } });

    await productController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1, name: "Martelo de Thor" });
  });

  it('Utilizando a funcao updateProduct para editar um produto', async function () {

    const res = {};
    const req = { body: { name: "Martelo de Thor" }, params: 1, };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'updateProduct')
      .resolves({ type: null, message: { id: 1, name: "Martelo de Thor" } });

    await productController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: "Martelo de Thor" });
  });

  it('Utilizando a funcao updateProduct para editar um produto não existente', async function () {

    const res = {};
    const req = { body: { name: "Martelo de Thor" }, params: 99, };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'updateProduct')
      .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    await productController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('Utilizando a funcao deleteProduct para deletar um produto', async function () {
    // referencia https://stackoverflow.com/questions/47502851/res-status-not-a-function-when-trying-to-set-the-status-code
    const res = {
      end: function () { },
      sendStatus: function (s) { this.statusCode = s; return this; }
    };
    const req = { params: 1 };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'deleteProduct')
      .resolves({ type: null });

    await productController.deleteProduct(req, res);
    expect(res.statusCode).to.equal(204);

  });
  it('Utilizando a funcao deleteProduct para deletar um produto inexistente', async function () {

    const res = {};
    const req = { params: 99 };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'deleteProduct')
      .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    await productController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

  });

  it('Utilizando a funcao findProductByTerm para procurar um produto por um termo', async function () {
    const productByterm = [{
      id: 1,
      name: "Martelo de Thor"
    }]
    const res = {};
    const req = { query: 'ma' };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productService, 'findProductByTerm')
      .resolves({ type: null, message: productByterm });

    await productController.findProductByTerm(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productByterm);
  });
  afterEach(sinon.restore);
});