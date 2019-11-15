const request = require('supertest');
const authRouter = require('./auth-router');
const db = require('../database/dbConfig.js');
const Users = require('./auth-model.js');


describe('register', () => {
    describe('register status', () => {
        it('successfully registered', () => {
                request(authRouter)
                .post('/register')
                .send({
                    username: 'Testing',
                    password: 'Testing'
                })
                .then(res => {
                    expect(res.status).toBe('201')
                })
        })
    });
    describe('new user', () => {
        it('id and password present', () => {
                request(authRouter)
                .post('/register')
                .send({
                    username: 'Testing',
                    password: 'Testing'
                })
                .then(res => {
                    expect(res.username).toBe('Testing')
                    expect(res.password).toBe('Testing');
                })
        })
    })
})


describe('login', () => {
    describe('login status', () => {
        it('name should match', () => {
                request(authRouter)
                .post('/login')
                .send({
                    username: 'Zuckerberg',
                    password: 'Facebook'
                })
                .then(res => {
                    expect(res.username).toBe('Zuckerberg')
                })
        })
    })
    describe('login status', () => {
        it('returns 200', () => {
                request(authRouter)
                .post('/login')
                .send({
                    username: 'Zuckerberg',
                    password: 'Facebook'
                })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })
}) 