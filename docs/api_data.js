define({ "api": [
  {
    "type": "get",
    "url": "/api/tesla/quotes",
    "title": "Request all quotes",
    "name": "GetQuotes",
    "group": "Quotes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Quote author</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quote_id",
            "description": "<p>Quote ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "quote",
            "description": "<p>Quote contents</p>"
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
    "version": "0.0.0",
    "filename": "app/routes/endpoints.js",
    "groupTitle": "Quotes"
  }
] });
