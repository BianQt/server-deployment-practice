'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);
// API Testing 

describe('API server testing', ()=>{
   
    // Test invaild URLs
    test('Handle invaild URLs', async()=>{
        const response = await request.get('/not-found');
        expect(response.status).toEqual(404);
    })

    // Test the home route
    test('If there is a home route', async()=>{
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Server is Up & Running!');
    });

    // Test the data end point
    test('If data end point works', async()=>{
        const response = await request.get('/data');
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object');
    })

     // test if the stamper middleware works
     test('stamper middleware works', async () => {
        const response = await request.get('/data');
        expect(response.status).toEqual(200);
        expect(response.body.time).toBeDefined();
    })

})