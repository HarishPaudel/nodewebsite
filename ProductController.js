var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("./connect")();

var routes = function () {
    router.route('/')
        .get(function (req, res) {
            conn.connect().then(function () {
             ///   res.json({"hari":"kkk"});
                var sqlQuery = "SELECT * FROM Products";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                    .catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while selecting data");
                    });
            })
                .catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                    res.status(400).send("Error while inserting1 data");
                });
        });

    router.route('/')
        .post(function (req, res) {
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    var reqBody = request.body
                  //  response.write(reqBody)
                    console.log("productname",req.body.ProductName)
                    request.input("ProductName", sql.VarChar(50), req.body.ProductName)
                    request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice)
                    request.execute("Usp_InsertProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                          ///  res.status(400).send(err);
                            res.status(400).send("Error while inserting1 data");
                        });
                    }).catch(function (err) {
                        conn.close();
                      //  res.status(400).send(err);
                        res.status(400).send("Error while inserting2 data");
                    });
                }).catch(function (err) {
                    conn.close();
                  //  res.status(400).send(err);
                    res.status(400).send("Error while inserting3 data");
                });
            }).catch(function (err) {
                conn.close();
               // res.status(400).send(err);
                res.status(400).send("Error while inserting4 data");
            });
        });


    router.route('/:id')
        .put(function (req, res) {
            var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductID", sql.Int, _productID)
                    request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice)
                    request.execute("Usp_UpdateProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while updating data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while updating data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while updating data");
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send("Error while updating data");
            });
        });


        router.route('/:id')
        .delete(function (req, res) {
            var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductID", sql.Int, _productID)
                    request.execute("Usp_DeleteProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).json("ProductID:" + _productID);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send("Error while Deleting data");
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send("Error while Deleting data");
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send("Error while Deleting data");
                });
            })
        });

    return router;
};
module.exports = routes;