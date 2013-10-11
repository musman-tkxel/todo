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


describe('#New TODO Object', function(){
    describe('#When Object Save Succeeded', function() {
        it('respond with JSON', function(done) {

            request(app)
                .post('/todos/add')
                .set('Accept', 'application/json')
                .send({title: 'welcome'})
                .expect(200)
                .end(done);
        });
    });

    describe('#When Object Save Failed', function() {
        it('respond with JSON', function(done) {

            request(app)
                .post('/todos/add')
                .set('Accept', 'application/json')
                .send({title : null})
                .expect(200)
                .end(done);
        });
    });
});

describe('#Destroy TODO Object', function(){
    describe('#When Object Destroy by ID Succeed', function() {
        it('respond with JSON', function(done) {
            request(app)
                .post('/todos/destroy')
                .set('Accept', 'application/json')
                .send({id: '5257b27f124a9c1c1b000050'})
                .expect(200)
                .end(done);
        });
    });

    describe('#When Object Destroy by ID Failed', function() {
        it('respond with JSON', function(done) {

            request(app)
                .post('/todos/destroy')
                .set('Accept', 'application/json')
                .send({id : -1})
                .expect(500)
                .end(function(err, res){
                    if(err) throw  err;
                    console.log("Object Destroy by ID Failed. ID not found.");
                });
        });
    });
});

describe('#LIST TODO Objects', function(){
    describe('#When Getting Object List Succeed', function() {
        it('respond with JSON', function(done) {
            request(app)
                .get('/todos/')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res){
                    if(err) throw err;
                    console.log("Successfully Receive TODO Objects List");
                });
        });
    });

    describe('#When List have Content-Type: application/json; charset=utf-8', function() {
        it('respond with JSON', function(done) {

            request(app)
                .get('/todos/')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(done);
        });
    });

    describe('#When List Count is > 0', function() {
        it('respond with JSON', function(done) {
            request(app)
                .get('/todos/')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res){
                    if(err) throw err;
                    console.log(res.body);
                    console.log("Response Length: " + res.body.length);
                    done();
                });
        });
    });
});
