export const album_list_schema_data = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$ref": "#/definitions/JSONData",
  "definitions": {
      "JSONData": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "album": {
                  "$ref": "#/definitions/Album"
              }
          },
          "required": [
              "album"
          ],
          "title": "JSONData"
      },
      "Album": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "artist": {
                  "type": "string"
              },
              "mbid": {
                  "type": "string"
              },
              "tags": {
                  "$ref": "#/definitions/Tags"
              },
              "name": {
                  "type": "string"
              },
              "image": {
                  "type": "array",
                  "items": {
                      "$ref": "#/definitions/Image"
                  }
              },
              "tracks": {
                  "$ref": "#/definitions/Tracks"
              },
              "listeners": {
                  "type": "string",
                  "format": "integer"
              },
              "playcount": {
                  "type": "string",
                  "format": "integer"
              },
              "url": {
                  "type": "string",
                  "format": "uri",
                  "qt-uri-protocols": [
                      "https"
                  ]
              }
          },
          "required": [
              "artist",
              "image",
              "listeners",
              "mbid",
              "name",
              "playcount",
              "tags",
              "tracks",
              "url"
          ],
          "title": "Album"
      },
      "Image": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "size": {
                  "type": "string"
              },
              "#text": {
                  "type": "string",
                  "format": "uri",
                  "qt-uri-protocols": [
                      "https"
                  ],
                  "qt-uri-extensions": [
                      ".png"
                  ]
              }
          },
          "required": [
              "#text",
              "size"
          ],
          "title": "Image"
      },
      "Tags": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "tag": {
                  "type": "array",
                  "items": {
                      "$ref": "#/definitions/Tag"
                  }
              }
          },
          "required": [
              "tag"
          ],
          "title": "Tags"
      },
      "Tag": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "url": {
                  "type": "string",
                  "format": "uri",
                  "qt-uri-protocols": [
                      "https"
                  ]
              },
              "name": {
                  "type": "string"
              }
          },
          "required": [
              "name",
              "url"
          ],
          "title": "Tag"
      },
      "Tracks": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "track": {
                  "type": "array",
                  "items": {
                      "$ref": "#/definitions/Track"
                  }
              }
          },
          "required": [
              "track"
          ],
          "title": "Tracks"
      },
      "Track": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "streamable": {
                  "$ref": "#/definitions/Streamable"
              },
              "duration": {
                  "anyOf": [
                      {
                          "type": "integer"
                      },
                      {
                          "type": "null"
                      }
                  ]
              },
              "url": {
                  "type": "string",
                  "format": "uri",
                  "qt-uri-protocols": [
                      "https"
                  ],
                  "qt-uri-extensions": [
                      ".+siedah+garrett)"
                  ]
              },
              "name": {
                  "type": "string"
              },
              "@attr": {
                  "$ref": "#/definitions/Attr"
              },
              "artist": {
                  "$ref": "#/definitions/Artist"
              }
          },
          "required": [
              "@attr",
              "artist",
              "duration",
              "name",
              "streamable",
              "url"
          ],
          "title": "Track"
      },
      "Attr": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "rank": {
                  "type": "integer"
              }
          },
          "required": [
              "rank"
          ],
          "title": "Attr"
      },
      "Artist": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "url": {
                  "type": "string",
                  "format": "uri",
                  "qt-uri-protocols": [
                      "https"
                  ]
              },
              "name": {
                  "type": "string"
              },
              "mbid": {
                  "type": "string"
              }
          },
          "required": [
              "mbid",
              "name",
              "url"
          ],
          "title": "Artist"
      },
      "Streamable": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
              "fulltrack": {
                  "type": "string",
                  "format": "integer"
              },
              "#text": {
                  "type": "string",
                  "format": "integer"
              }
          },
          "required": [
              "#text",
              "fulltrack"
          ],
          "title": "Streamable"
      }
  }
}
