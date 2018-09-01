import { Request, Response, Router } from "express";
import * as uuid from "uuid";

import { Option, Field, Form, Item } from "./../models/model";

const formRouter: Router = Router();

// Make the initial Form
formRouter.post("/form/:formid", (request: Request, response: Response) => {

  var form = new Form(
    {
      id: request.params.formid,
      fields: []
    }
  );

  form.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Returns the form
formRouter.get("/form/:id", (request: Request, response: Response) => {

  Form.find({ id: request.params.id }, function (err, items) {
    if (err) return console.error(err);
    response.json(items[0]);
  });
});

// Updates a form
formRouter.put("/form", (request: Request, response: Response) => {
  let form = new Form();

  form = request.body;

  Form.update({ id: request.body.id }, { $set: { fields: request.body.fields } }, function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Eventually: delete a form

// Make an Item to be assessed
formRouter.post("/item", (request: Request, response: Response) => {

  var item = new Item(
    {
      address: request.body.address,
      addressID: request.body.addressID,
      score: request.body.score,
      form: request.body.form,
      formid: request.body.formid
    }
  );

  item.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Updates an item
formRouter.put("/item", (request: Request, response: Response) => {

  Item.update({ address: request.body.address }, { $set: { form: request.body.form, score: request.body.score } }, function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Returns one item
formRouter.get("/item/:addressid", (request: Request, response: Response) => {

  let res;

  Item.find({ address: request.params.addressid }, function (err, items) {
    if (err) return console.error(err);
    res = items[0];
    return response.json(res);
  });

});

// Returns all Items
formRouter.get("/item/all/:formid", (request: Request, response: Response) => {

  let res = [];

  Item.find({ formid: request.params.formid }, function (err, items) {
    if (err) return console.error(err);
    res = items;
    return response.json(res);
  });
});

// Deletes an item
formRouter.delete("/item/:addressid", (request: Request, response: Response) => {

  let item = new Item();

  Item.find({ address: request.params.addressid }).remove( function (err, items) {
    if (err) return console.error(err);
  });

});

export { formRouter };
