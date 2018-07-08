import { Request, Response, Router } from "express";
import * as uuid from "uuid";

import { Option, Field, Form, Item } from "./../models/model";

const formRouter: Router = Router();

const check = {
  message: "Hello World! Great to see you!"
};

formRouter.get("/hello", (request: Request, response: Response) => {

  response.json(check);
});

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
formRouter.post("/form/:formid", (request: Request, response: Response) => {

  console.log("POST form " + JSON.stringify(request.params.formid));

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

// Make an Item to be assessed
formRouter.post("/item/:addressid", (request: Request, response: Response) => {

  var item = new Item(
    {
      address: request.body.address,
      addressID: request.body.addressID,
      score: request.body.score,
      form: JSON.stringify(request.body.form)
    }
  );

  item.save(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

  console.log("POST item " + JSON.stringify(request.body));

});

// Returns all Items
formRouter.get("/item/all/:formid", (request: Request, response: Response) => {

  let res;

  Item.find({ form: request.params.formid }, function (err, items) {
    if (err) return console.error(err);
    res = items;
  });

  return response.json(res);
});

// Returns one item
formRouter.get("/item/:addressid", (request: Request, response: Response) => {

  let res;

  Item.find({ addressID: request.params.addressid }, function (err, items) {
    if (err) return console.error(err);
    res = items[0];
  });

  console.log("GET item " + JSON.stringify(request.params.addressid));

  return response.json(res);
});

// Returns the form
formRouter.get("/form/:id", (request: Request, response: Response) => {

  console.log("GET form " + JSON.stringify(request.params.id));

  Form.find({ id: request.params.id }, function (err, items) {
    if (err) return console.error(err);
    console.log("items returned: " + JSON.stringify(items));
    response.json(items[0]);
  });
});

// Updates an item
formRouter.put("/item", (request: Request, response: Response) => {

  let item = request.body;

  Item.update({ addressid: request.body.addressid }, { $set: { form: request.body.form, score: request.body.score } }, function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

  console.log("PUT item " + JSON.stringify(request.body));

});

// Updates a form
formRouter.put("/form", (request: Request, response: Response) => {
  let form = new Form();

  form = request.body;

  Form.update({ id: request.body.id }, { $set: { fields: request.body.fields } }, function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

  console.log("PUT form " + JSON.stringify(request.body));

});

// Deletes an item
formRouter.delete("/item/:addressid", (request: Request, response: Response) => {

  let item = new Item();

  Item.find({ addressID: request.params.addressid }, function (err, items) {
    if (err) return console.error(err);
    item = items[0];
  });

  item.dropCollection(function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

  console.log("DELETE item " + JSON.stringify(request.params.addressid));

});

// Eventually: delete a form

export { formRouter };
