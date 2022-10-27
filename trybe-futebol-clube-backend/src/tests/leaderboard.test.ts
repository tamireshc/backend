import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchModel from '../database/models/Match';
import { homeLeaderboard, awayLeaderboard, leaderboard, homeLeaderboardResult, awayLeaderboardResult } from './mocks/leaderbors'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route GET /leaderboard/home, /leaderboard/away e /leaderboard', () => {
    describe('Quando são buscados todos as partidas dos times mandantes em GET /leaderboard/home ', () => {
        let chaiHttpResponse: Response;
        beforeEach(async () => {
            sinon
                .stub(matchModel, "findAll")
                .resolves(homeLeaderboard as any);
        });

        afterEach(() => {
            (matchModel.findAll as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/leaderboard/home')
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal(homeLeaderboardResult)

        })
    });

    describe('Quando são buscados todos as partidas dos times visitantes em GET /leaderboard/away ', () => {
        let chaiHttpResponse: Response;
        beforeEach(async () => {
            sinon
                .stub(matchModel, "findAll")
                .resolves(awayLeaderboard as any);
        });

        afterEach(() => {
            (matchModel.findAll as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/leaderboard/away')
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal(awayLeaderboardResult)

        })

    })
    describe('Quando são buscados todos as partidas dos times  em GET /leaderboard ', () => {
        let chaiHttpResponse: Response;
        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/leaderboard')
            expect(httpResponse.status).to.equal(200)
            // expect(httpResponse.body).to.deep.equal(leaderboard)


        })
    });

})



