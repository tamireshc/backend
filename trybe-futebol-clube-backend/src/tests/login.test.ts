import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import userModel from '../database/models/User';
import { getUserByEmail, token } from './mocks/user'
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route POST /login e GET /login/validate', () => {
    describe('Quando os campos "email" e "password" são informados em /login ', () => {
        const user = { email: 'admin@admin.com', password: 'secret_admin' }
        let chaiHttpResponse: Response;
        beforeEach(async () => {
            sinon
                .stub(userModel, "findOne")
                .resolves(getUserByEmail as userModel);
        });

        afterEach(() => {
            (userModel.findOne as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send(user)
            expect(httpResponse.status).to.equal(200)
        })
    });
    describe('Quando o campo "email" não é informados em /login', () => {
        const user = { email: '', password: 'secret_admin' }
        let chaiHttpResponse: Response;
        it('deve retornar um status 400', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send(user)
            expect(httpResponse.status).to.equal(400)
            expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })

        })
    });
    describe('Quando o campo "password" não é informados em /login', () => {
        const user = { email: 'admin@admin.com', password: '' }
        let chaiHttpResponse: Response;
        it('deve retornar um status 400', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send(user)
            expect(httpResponse.status).to.equal(400)
            expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })

        })
    });
    describe('Quando o campo "email" não é valido em /login', () => {
        const user = { email: 'admin@admin', password: 'secret_admin' }
        let chaiHttpResponse: Response;
        it('deve retornar um status 400', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send(user)
            expect(httpResponse.status).to.equal(401)
            expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })

        })
    });
    describe('Quando os campos  "password" é informado incorretos em /login', () => {
        const user = { email: 'admin@admin.com', password: 'secret_admix' }
        let chaiHttpResponse: Response;
        beforeEach(async () => {
            sinon
                .stub(userModel, "findOne")
                .resolves(getUserByEmail as userModel);
        });

        afterEach(() => {
            (userModel.findOne as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 401', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send(user)
            expect(httpResponse.status).to.equal(401)
            expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
        })
    });
    describe('Quando o campo token nao é informado ou e informado errado em /login/validate ', () => {
        const user = { email: 'admin@admin', password: 'secret_admin' }
        let chaiHttpResponse: Response;
        it('Deve retornar um status 401', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/login/validate')
            expect(httpResponse.status).to.equal(401)
            expect(httpResponse.body).to.deep.equal({ error: 'Token não encontrado' })
        })
        it('Deve retornar um status 500', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/login/validate')
                .set({ "Authorization": `Bearer ${'xxxx'}` })
            expect(httpResponse.status).to.equal(500)
            expect(httpResponse.body).to.deep.equal('jwt malformed')
        })
    });
    describe('Quando o campo token é informado em /login/validate', () => {
        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/login/validate')
                .auth(token, { type: 'bearer' })
                .set({ "Authorization": token })
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal({ role: "admin" })
        })
    });

});


