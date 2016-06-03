define({ "api": [
  {
    "type": "delete",
    "url": "/api/tesla/quotes/:quote_id",
    "title": "Delete quote by ID",
    "name": "DeleteQuoteByID",
    "version": "1.1.0",
    "group": "Deletes",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "DELETE /api/tesla/quotess/:quote_id",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/endpoints.js",
    "groupTitle": "Deletes"
  },
  {
    "type": "get",
    "url": "/api/tesla/quotes",
    "title": "Request all quotes",
    "name": "GetQuotes",
    "version": "1.1.0",
    "group": "Gets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Array",
            "description": "<p>List of quote objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "GET /api/tesla/quotes 200\n[\n\t{\n\t\t\"_id\": \"560af6556a83bfe9094855b3\",\n\t\t\"quote_id\": \"101\",\n\t\t\"quote\": \"One of the great events ...\",\n\t\t\"author\": \"Nikola Tesla\",\n\t\t\"__v\": 0\n\t},\n\t{\n\t\t\"_id\": \"560af6556a83bfe9094855b2\",\n\t\t\"quote_id\": \"102\",\n\t\t\"quote\": \"Power can be, and at...\",\n\t\t\"author\": \"Nikola Tesla\",\n\t\t\"__v\": 0\n\t},\n\t...\n]",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/endpoints.js",
    "groupTitle": "Gets"
  },
  {
    "type": "get",
    "url": "/api/tesla/quotes/:quote_id",
    "title": "Get quote by ID",
    "name": "QuoteByID",
    "version": "1.1.0",
    "group": "Gets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Database",
            "description": "<p>ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "Quote",
            "description": "<p>ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Author",
            "description": "<p>name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "GET /api/tesla/quotes/69  200\n{\n\t\"_id\": \"560af6556a83bfe9094855d3\",\n\t\"quote_id\": 69,\n\t\"quote\": \"Our senses enable us to perceive only a ...\",\n\t\"author\": \"Nikola Tesla\",\n\t\"_v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/endpoints.js",
    "groupTitle": "Gets"
  },
  {
    "type": "get",
    "url": "/api/tesla/quotes/randome",
    "title": "Get random quotes",
    "name": "RandomQuote",
    "version": "1.1.0",
    "group": "Gets",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Database ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "quote_id",
            "description": "<p>Quote ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quote",
            "description": "<p>Quote text</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "GET /api/tesla/quotes/random\n{\n\t\"_id\": \"560af6556a83bfe9094855d2\",\n\t\"quote_id\": 70,\n\t\"quote\": \"\"What the result of these investigations will...\",\n\t\"author\": \"Nikola Tesla\",\n\t\"_v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/endpoints.js",
    "groupTitle": "Gets"
  },
  {
    "type": "post",
    "url": "/api/tesla/posts",
    "title": "Create quote",
    "name": "CreateQuote",
    "version": "1.1.0",
    "group": "Posts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Quote created</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "quote",
            "description": "<p>Created quote object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "POST /api/tesla/quotes 200\n{\n\t\"msg\": \"Quote created!\",\n\t\"quote\": {\n\t\t\"_v\": 0,\n\t\t\"quote\": \"Creating api docs!\",\n\t\t\"quote_id\": 339767,\n\t\t\"author\": \"Javis Sullivan\",\n\t\t\"_id\": \"5750dbd6895161b24413b611\"\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/endpoints.js",
    "groupTitle": "Posts"
  },
  {
    "type": "put",
    "url": "/api/tesla/quotes/:quote_id",
    "title": "Update quote by ID",
    "name": "UpdateQuoteByID",
    "version": "1.1.0",
    "group": "Puts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Database ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "quote_id",
            "description": "<p>Quote ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quote",
            "description": "<p>Quote text</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Author name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "PUT /api/tesla/quotes/:quote_id  204",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Error message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response",
          "content": "PUT /api/tesla/quotes/:quote_id  404\n{\n\t\"msg\": \"Quote {quote_id} Does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/endpoints.js",
    "groupTitle": "Puts"
  }
] });
