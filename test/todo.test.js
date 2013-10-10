var express = require('express');
var request = require('supertest');
var app = require('../app');

describe('#Routed to INDEX successfully', function() {
    it('respond with JSON', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .end(done);
    });
});


describe('#Save Object Successfully', function() {
    it('respond with JSON', function(done) {

        request(app)
            .post('/todos/add')
            .set('Accept', 'application/json')
            .send({title: 'welcome'})
            .expect(200)
            .end(done);
    });
});
