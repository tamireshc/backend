import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsModel from '../database/models/Team';
import { allteams, team } from './mocks/teams'

import { Response } from 'superagent';
import { ITeam } from '../entities/ITeam';


chai.use(chaiHttp);

const { expect } = chai;

describe('Route GET /teams ', () => {
    describe('Quando são buscados todos os times em GET /teams ', () => {
        let chaiHttpResponse: Response;

        beforeEach(async () => {
            sinon
                .stub(teamsModel, "findAll")
                .resolves(allteams as any);
        });

        afterEach(() => {
            (teamsModel.findAll as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/teams')
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal(allteams)

        })
    });
    describe('Quando é buscado um time pelo seu id  em GET /teams/:id ', () => {
        let chaiHttpResponse: Response;
        beforeEach(async () => {
            sinon
                .stub(teamsModel, "findByPk")
                .resolves(team as any);
        });

        afterEach(() => {
            (teamsModel.findByPk as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/teams/2')
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal(team)

        })
    });
})