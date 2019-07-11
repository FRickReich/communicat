'use strict';

const cfenv = require("cfenv");

module.exports = (app) => {
    let mydb, cloudant, vendor, vcapLocal;
    const dbName = 'blog';

    let getAllBlogPosts = {};
    let addNewBlogPost = {};
    let deleteBlogPost = {};

    getAllBlogPosts.cloudant = function (response) {
        var posts = [];
        mydb.list({ include_docs: true }, function (err, body) {
            if (!err) {
                body.rows.forEach(function (row) {
                    if (row.doc)
                        posts.push(row.doc);
                });
                response.json(posts);
            }
        });
    }

    addNewBlogPost.cloudant = function(doc, response)
    {
        mydb.insert(doc, function(err, body, header) {
            if (err) {
                console.log('[mydb.insert] ', err.message);
                response.send("Error");
                return;
            }
            doc._id = body.id;
            response.send(doc);
        });
    }

    // APU routes
    app.get('/api/blog/all', (req, res, next) => {
        var names = [];
        if (!mydb) {
            responresse.json(names);
            return;
        }
        getAllBlogPosts[vendor](res);
    });

    app.post("/api/blog/new", function (request, response) {
        var data = request.body;
        var doc = { "name" : data.name };
        if(!mydb) {
            console.log("No database.");
            response.send(doc);
            return;
        }
        addNewBlogPost[vendor](doc, response);
});

    // Load VCap variables.
    try {
        vcapLocal = require('./../../../vcap-local.json');
        console.log("Loaded local VCAP", vcapLocal);
    } catch (e) { }

    // Set VCap Options.
    const appEnvOpts = vcapLocal ? { vcap: vcapLocal } : {}
    const appEnv = cfenv.getAppEnv(appEnvOpts);

    // Set up Cloudant;
    if (appEnv.services['compose-for-mongodb'] || appEnv.getService(/.*[Mm][Oo][Nn][Gg][Oo].*/)) {
        // Load the MongoDB library.
        var MongoClient = require('mongodb').MongoClient;

        // Initialize database with credentials
        if (appEnv.services['compose-for-mongodb']) {
            MongoClient.connect(appEnv.services['compose-for-mongodb'][0].credentials.uri, null, function (err, db) {
                if (err) {
                    console.log(err);
                } else {
                    mydb = db.db(dbName);
                    console.log("Created database: " + dbName);
                }
            });
        } else {
            // user-provided service with 'mongodb' in its name
            MongoClient.connect(appEnv.getService(/.*[Mm][Oo][Nn][Gg][Oo].*/).credentials.uri, null,
                function (err, db) {
                    if (err) {
                        console.log(err);
                    } else {
                        mydb = db.db(dbName);
                        console.log("Created database: " + dbName);
                    }
                }
            );
        }

        vendor = 'mongodb';
    } else if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/[Cc][Ll][Oo][Uu][Dd][Aa][Nn][Tt]/)) {
        // Load the Cloudant library.
        var Cloudant = require('@cloudant/cloudant');

        // Initialize database with credentials
        if (appEnv.services['cloudantNoSQLDB']) {
            // CF service named 'cloudantNoSQLDB'
            cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
        } else {
            // user-provided service with 'cloudant' in its name
            cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
        }
    } else if (process.env.CLOUDANT_URL) {
        cloudant = Cloudant(process.env.CLOUDANT_URL);
    }
    if (cloudant) {

        // Create a new "mydb" database.
        cloudant.db.create(dbName, function (err, data) {
            if (!err) //err if database doesn't already exists
                console.log("Created database: " + dbName);
        });

        // Specify the database we are going to use (mydb)...
        mydb = cloudant.db.use(dbName);

        vendor = 'cloudant';
    }
}
