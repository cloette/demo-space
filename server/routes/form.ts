import { Request, Response, Router } from "express";
import * as uuid from "uuid";

import { Option, Field, Form, Item } from "./../models/model";

const formRouter: Router = Router();

// Make a new option
formRouter.post("/option", (request: Request, response: Response) => {

  var option = new Option({
    helperText: request.body.helperText,
    value: request.body.value
  });

  option.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Make a new field
formRouter.post("/field", (request: Request, response: Response) => {

  var field = new Field({
    order: request.body.order,
    type: request.body.type,
    question: request.body.question,
    options: request.body.options,
    multiplier: request.body.multiplier,
    value: request.body.value,
    maxValue: request.body.maxValue,
    disabled: false
  });

  field.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Make the initial Form
formRouter.post("/form", (request: Request, response: Response) => {

  var form = new Form(
    {
      id: request.body.toString(),
      fields: []
    }
  );

  form.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Make an Item to be assessed
formRouter.post("/item", (request: Request, response: Response) => {

  var item = new Item(
    {
      address: request.body.address,
      addressId: encodeURI(request.body.address),
      score: request.body.score,
      form: request.body.form
    }
  );

  item.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Returns all Items
formRouter.get("/item/all/:formid", (request: Request, response: Response) => {

  let res = {}

  Item.find({ form: request.params.formid }, function (err, items) {
    if (err) return console.error(err);
    res = items;
  });

  return response.json(res);
});

// Returns the form
formRouter.get("/form/:id", (request: Request, response: Response) => {

  let res = {}

  Form.find({ id: request.params.id }, function (err, items) {
    if (err) return console.error(err);
    res = items[0];
  });

  return response.json(res);
});

// Updates an item
formRouter.put("/item/:addressid", (request: Request, response: Response) => {

  let item = new Item({});

  Item.find({ addressID: request.params.addressid }, function (err, items) {
    if (err) return console.error(err);
    item = items[0];
  });

  item.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Updates a form
formRouter.put("/form/:id", (request: Request, response: Response) => {

  let form = new Form({});

  form = request.body.form;

  form.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Deletes an item
formRouter.delete("/item/:addressid", (request: Request, response: Response) => {

  let item = new Item({});

  Item.find({ addressID: request.params.addressid }, function (err, items) {
    if (err) return console.error(err);
    item = items[0];
  });

  item.dropCollection(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

});

// Eventually: delete a form

export { formRouter };
