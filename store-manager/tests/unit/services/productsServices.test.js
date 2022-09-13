const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/productsModel');
const productService = require('../../../src/services/serviceProcucts')

describe('Testes de unidade do service de Products', function () {
  it('Utilizando a funcao listAllProducts', async function () {
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

    sinon.stub(productModel, 'listAllProducts').resolves(mockProducts);
    const result = await productService.listAllProducts()
    expect(result).to.deep.equal(mockProducts);
  });

  it('Utilizando a funcao findProductById', async function () {
    mockProducts1 =
    {
      id: 1,
      name: "Martelo de Thor"
    }

    sinon.stub(productModel, 'findProductById').resolves(mockProducts1);
    const result = await productService.findProductById(1)
    expect(result).to.deep.equal({ type: null, message: mockProducts1 });
  });

  it('Utilizando a funcao findProductById com id inexistente', async function () {


    sinon.stub(productModel, 'findProductById').resolves(undefined);
    const result = await productService.findProductById(99)
    expect(result).to.deep.equal({ type: 'NOT_FOUND', message: 'Product not found' });
  });

  it('Utilizando a funcao createProduct para add um produto', async function () {

    sinon.stub(productModel, 'createProduct').resolves(1);
    const result = await productService.createProduct(
      "Martelo de Thor"
    )
    expect(result).to.deep.equal({ type: null, message: { id: 1, name: "Martelo de Thor" } });
  });

  it('Utilizando a funcao updateProduct para editar um produto', async function () {

    sinon.stub(productModel, 'updateProduct').resolves(1);
    const result = await productService.updateProduct(
      "Martelo de Thor", 1
    )
    expect(result).to.deep.equal({ type: null, message: { id: 1, name: "Martelo de Thor" } });
  });

  it('Utilizando a funcao updateProduct para editar um produto que não existe', async function () {

    sinon.stub(productModel, 'updateProduct').resolves(0);
    const result = await productService.updateProduct(
      "Martelo de Thor", 99
    )
    expect(result).to.deep.equal({ type: 'NOT_FOUND', message: 'Product not found' });
  });


  it('Utilizando a funcao deleteProduct para deletar um produto', async function () {

    sinon.stub(productModel, 'deleteProduct').resolves(1);
    const result = await productService.deleteProduct(1)
    expect(result).to.deep.equal({ type: null });
  });

  it('Utilizando a funcao deleteProduct para deletar um produto inexistente', async function () {

    sinon.stub(productModel, 'deleteProduct').resolves(0);
    const result = await productService.deleteProduct(99)
    expect(result).to.deep.equal({ type: 'NOT_FOUND', message: 'Product not found' });
  });

  it('Utilizando a funcao findProductByTerm  procurar um produto', async function () {
    const productByterm = [{
      id: 1,
      name: "Martelo de Thor"
    }]
    sinon.stub(productModel, 'findProductByTerm').resolves(productByterm);
    const result = await productService.findProductByTerm('ma')
    expect(result).to.deep.equal({ type: null, message: productByterm });
  });

  afterEach(sinon.restore);
});