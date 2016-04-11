'use strict'
var url = require ('url')

var fs = require('fs')

var requestHandler = function ( request, response, callback ){

  var responseBody = ''

  var requestUrl = url.parse(request.url, true)

  var pages = [
    {
      url: '/',
      filename: 'home.html'
    },
    {
      url: '/first-of-pair',
      filename: 'first-of-pair.html'
    },
    {
      url: '/second-of-pair',
      filename: 'second-of-pair.html'
    },
    {
      url: '/the-pair',
      filename: 'the-pair.html'
    },
    {
      url: '/greeting',
      filename: 'greeting.html'
    }
  ]

  var selectedPage = pages.filter(function(element){
      return element.url === requestUrl.pathname
  })

  var fileToRead = ''

  //To use with Files on HDD
  if(selectedPage.length > 0)
  {
    //fileToRead = selectedPage[0].url.replace('/','') + '.html'
    fileToRead = selectedPage[0].filename
    response.statusCode = 200
  }
  else {
    fileToRead = '404.html'
    response.statusCode = 404
  }

  fs.readFile(fileToRead, function(err, data){

      responseBody = data.toString()
      if (requestUrl.query.name !== undefined){
        response.end(responseBody.replace('&name', requestUrl.query.name))
      } else {
        response.end(responseBody)
      }

      callback(err, data)
    })

  // if(selectedPage.length > 0)
  // {
  //   responseBody = selectedPage[0].content
  // }
  // else {
  //   response.statusCode = 404
  //   responseBody = '<p>URL not found, you plum</p>'
  // }
  //
  // response.end(responseBody)
}

module.exports = requestHandler
