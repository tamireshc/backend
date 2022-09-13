const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection')
const productsModel = require('../../../src/models/productsModel');

describe('Testes de unidade do model de Products', function () {
  it('Realizando uma operação listar todos os produtos com o model Products', async function () {
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
    sinon.stub(connection, 'execute').resolves([mockProducts]);
    const result = await productsModel.listAllProducts()
    expect(result).to.equal(mockProducts);
  });

  it('Realizando uma operação listar o produto com id 1', async function () {
    mockProducts1 = {
      id: 1,
      name: "Machado do Thor Stormbreaker",
    }
    // problema
    //sinon.stub(connection, 'execute').resolves(mockProducts1);

    const result = await productsModel.findProductById(2)
    // console.log('result', result)

    //expect(result).to.deep.equal('teste');
  });

  it('Realizando uma operação criar um novo produto com o model Products', async function () {

    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await productsModel.createProduct({
      name: "Martelo de Thor"
    })
    expect(result).to.equal(1);
  });

  it('Realizando uma operação editar um produto com o model Products', async function () {

    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productsModel.updateProduct({
      name: "Martelo de Thor",
      id: 1,
    })
    expect(result).to.equal(1);
  });

  it('Realizando uma operação deleter um produto com o model Products', async function () {

    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productsModel.deleteProduct(1)
    expect(result).to.equal(1);
  });

  it('Realizando uma operação deleter um produto com um produto inexistente no model Products', async function () {

    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
    const result = await productsModel.deleteProduct(99)
    expect(result).to.equal(0);
  });

  it('Realizando uma operação de procurar um produto por termo no model Products', async function () {

    sinon.stub(connection, 'execute').resolves([[{
      id: 1,
      name: "Martelo de Thor"
    }]]);
    const result = await productsModel.findProductByTerm('ma')
    expect(result).to.deep.equal([{
      id: 1,
      name: "Martelo de Thor"
    }]);
  });

  afterEach(sinon.restore);
});