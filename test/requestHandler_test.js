'use strict'

var chai = require('chai')
var expect = chai.expect

var requestHandler = require('../requestHandler')

var request = {
  url: '/'
}
var response = {
  responsebody:'',
  statusCode: '',
  end: function (body) {
    this.responseBody = body
  }
}

describe('Given a requestHandler', function(){
  describe('When called ', function(){
    it('Then returns a response', function(done){

      function callback(err, data)
      {
        expect(response.responseBody).to.not.equal('')

        done()
      }

      requestHandler(request, response, callback)

    })
  })

  describe('When called', function () {
    it('it returns 200 as a status code', function (done) {

      function callback(err, data)
      {
        expect(response.statusCode).to.equal(200)

        done()
      }

      requestHandler(request, response, callback)
    })
  })
  describe('When called', function(){
    describe('Given the route url ("/")', function(){
      it('returns an HTML page with 3 links', function(done){

        function callback(err, data)
        {
          expect(response.responseBody).to.have.string('<a href="/first-of-pair">first-of-pair</a>')
          expect(response.responseBody).to.have.string('<a href="/second-of-pair">second-of-pair</a>')
          expect(response.responseBody).to.have.string('<a href="/the-pair">the-pair</a>')

          done()
        }

        requestHandler(request, response, callback)
      })
    })
    describe('Given the route of "/first-of-pair"', function(){
      it('Then returns a page containing text about first-of-pair', function(done){
        request = {
          url: '/first-of-pair'
        }
        function callback(err, data)
    		{
          expect(response.responseBody).to.have.string('<p>And in the beginning there was the First Pair</p>')

    			done()
    		}

        requestHandler(request, response, callback)
      })
    })
    describe('Given the route of "/second-of-pair"', function () {
      it('Then returns a page containing text about second of pair', function (done) {
        request.url = '/second-of-pair'

        function callback(err, data)
    		{
          expect(response.responseBody).to.have.string('<p>and on the second day he separated the first pair from the second</p>')

    			done()
    		}

        requestHandler(request, response, callback)


      })
    })
    describe('Given the route "/the-pair"', function() {
      it('Then returns a page of text containing things the pair have in common', function(done){
        request.url = '/the-pair'

        function callback(err, data)
        {
          expect(response.responseBody).to.have.string('<p>The pair both have suspicious moustaches</p>')

          done()
        }

        requestHandler(request, response, callback)

      })
    })

    describe('Given a unhandled route', function () {
      it('should direct you to a 404 page with a 404 error', function (done) {
        request.url = '/three-of-a-kind'
        function callback(err, data)
        {
          expect(response.statusCode).to.equal(404)
          expect(response.responseBody).to.have.string('<p>URL not found, you plum</p>')

          done()
        }

        requestHandler(request, response, callback)

      })
    })

    describe('Given the route "/greeting" and the querystring parameter name', function(){
      it('Then the greeting "Welcome, Finn!" and the name should be displayed on the screen', function(done){
        request.url = '/greeting?name=Finn'
        function callback(err, data)
    		{
          expect(response.responseBody).to.have.string('<p>Welcome, Finn!</p>')

    			done()
    		}
        requestHandler(request, response, callback)
      })
      it('Then the greeting "Welcome, Smickers" and the name should be displayed on screen for a different name', function (done) {
        request.url = '/greeting?name=Smickers'

        function callback(err, data)
    		{
          expect(response.responseBody).to.have.string('<p>Welcome, Smickers!</p>')

    			done()
    		}

        requestHandler(request, response, callback)
      })
    })
  })


})
