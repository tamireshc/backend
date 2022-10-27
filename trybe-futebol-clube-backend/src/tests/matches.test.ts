import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchModel from '../database/models/Match';
import teamsModel from '../database/models/Team';
import { allMatches, allMatchesInProgressIsFalse, allMatchesInProgressIsTrue, Match, MatchEqual, newMatch } from './mocks/matches'

import { Response } from 'superagent';
import { token } from './mocks/user';
import { team } from './mocks/teams';



chai.use(chaiHttp);

const { expect } = chai;

describe('Route GET /matches, /matches?inProgress=false, POST /matches ', () => {
    describe('Quando são buscados todas as partidas em GET /matches ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "findAll")
                .resolves(allMatches as any);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.findAll as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/matches')
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal(allMatches)

        })
    });
    describe('Quando é buscado as partidas que não estao em progresso ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "findAll")
                .resolves(allMatchesInProgressIsFalse as any);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.findAll as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/matches?inProgress=false')
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal(allMatchesInProgressIsFalse)

        })
    });
    describe('Quando é buscado as partidas que estao em progresso ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "findAll")
                .resolves(allMatchesInProgressIsTrue as any);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.findAll as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/matches?inProgress=true')
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal(allMatchesInProgressIsTrue)

        })
    });
    describe('Quando é salvo uma partida com status em progresso utilizando um token em POST /matches ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "create")
                .resolves(newMatch as any);
            sinon
                .stub(teamsModel, "findByPk")
                .resolves(team as any);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.create as sinon.SinonStub).restore();
            (teamsModel.findByPk as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 201', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/matches')
                .send(Match)
                .set({ "Authorization": token })
            expect(httpResponse.status).to.equal(201)
            expect(httpResponse.body).to.deep.equal(newMatch)

        })
    });
    describe('Quando é salvo uma partida com status em progresso utilizando um token invalido em POST /matches ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "create")
                .resolves(newMatch as any);
            sinon
                .stub(teamsModel, "findByPk")
                .resolves(team as any);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.create as sinon.SinonStub).restore();
            (teamsModel.findByPk as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 401', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/matches')
                .send(Match)
                .set({ "Authorization": 'xxx' })
            expect(httpResponse.status).to.equal(401)
            expect(httpResponse.body).to.deep.equal({ message: "Token must be a valid token" })

        })
    });
    describe('Quando é salvo uma partida com um time inexistem na tabela teams e um token valido em POST /matches ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "create")
                .resolves(newMatch as any);
            sinon
                .stub(teamsModel, "findByPk")
                .resolves(null);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.create as sinon.SinonStub).restore();
            (teamsModel.findByPk as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 401', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/matches')
                .send(Match)
                .set({ "Authorization": token })
            expect(httpResponse.status).to.equal(404)
            expect(httpResponse.body).to.deep.equal({ message: "There is no team with such id!" })

        })
    });
    describe('Quando é salvo uma partida com um times iguais com um token valido em POST /matches ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "create")
                .resolves(newMatch as any);
            sinon
                .stub(teamsModel, "findByPk")
                .resolves(team as any);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.create as sinon.SinonStub).restore();
            (teamsModel.findByPk as sinon.SinonStub).restore();
        })

        it('Deve retornar um status 401', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/matches')
                .send(MatchEqual)
                .set({ "Authorization": token })
            expect(httpResponse.status).to.equal(422)
            expect(httpResponse.body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" })

        })
    });
    describe('Quando é alterado o status do inProgress para false em PATCH /matches/:id/finish ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "update")
                .resolves([0] as any);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.update as sinon.SinonStub).restore();

        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .patch('/matches/49/finish')
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal({ message: "Finished" })

        })
    });
    describe('Quando é atualizado o saldo de gols de partidas andamento em PATCH /matches/:id ', () => {
        let chaiHttpResponse: Response;
        // @ts-ignore
        beforeEach(async () => {
            sinon
                .stub(matchModel, "update")
                .resolves([0] as any);
        });
        // @ts-ignore
        afterEach(() => {
            (matchModel.update as sinon.SinonStub).restore();

        })

        it('Deve retornar um status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .patch('/matches/49')
                .send({
                    "homeTeamGoals": 3,
                    "awayTeamGoals": 1
                })
            expect(httpResponse.status).to.equal(200)
            expect(httpResponse.body).to.deep.equal({ message: "edited" })

        })
    });
})

