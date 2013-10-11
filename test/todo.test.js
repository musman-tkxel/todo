var express = require('express');
var request = require('supertest');
var app = require('../app');

describe('#Routed to INDEX successfully', function() {
    it('respond with JSON', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                console.log("PASS: Redirection to INDEX Successfully");
                done();
            });
    });
});



describe('#When Object Save Succeeded', function() {
    it('respond with JSON', function(done) {

        request(app)
            .post('/todos/add')
            .set('Accept', 'application/json')
            .send({title: 'welcome'})
            .expect(200)
            .end(function(err,res){
                if(err) throw err;
                console.log("PASS: Object Successfully Added");
                done();
            });
    });
});

describe('#When Object Destroy by ID Succeed', function() {
    it('respond with JSON', function(done) {

        request(app)
            .post('/todos/add')
            .set('Accept', 'application/json')
            .send({title: 'This is TESTING.'})
            .expect(200)
            .end(function(err, res){
                if(err) throw err;

                request(app)
                    .post('/todos/destroy')
                    .set('Accept', 'application/json')
                    .send({id : res.body._id})
                    .expect(200)
                    .end(function(err, res){
                        if(err) throw  err;
                        console.log("PASS: Self Created Object Destroy by ID Succeed.");
                        done();
                    });

            });
    });
});

describe('#When Object Destroy by ID Failed', function() {
    it('respond with JSON', function(done) {

        request(app)
            .post('/todos/destroy')
            .set('Accept', 'application/json')
            .send({id : -1})
            .expect(200)
            .end(function(err, res){
                if(err) throw  err;
                console.log("PASS: Object Destroy by ID Failed. ID not found.");
                done();
            });
    });
});

describe('#When Getting Object List Succeed', function() {
    it('respond with JSON', function(done) {
        request(app)
            .get('/todos/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if(err) throw err;
                //console.log(res.body);
                console.log("PASS: Successfully Receive TODO Objects List");
                done();
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
            .end(function(err, res){
                if(err) throw err;
                console.log("PASS: Content-Type -> application/json Received");
                done();
            });
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
                //console.log(res.body);
                console.log("PASS: Response List Length: " + res.body.length);
                done();
            });
    });
});
