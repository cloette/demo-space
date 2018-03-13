import { Request, Response, Router } from "express";
import * as uuid from "uuid";

import { Option, Field, Form, Item } from "./../models/model";

const formRouter: Router = Router();

formRouter.post("/", (request: Request, response: Response) => {

  response.json({
    id: uuid.v4(),
    name: request.body.name,
    text: request.body.text,
  });

});

// Make a new option
formRouter.post("/option", (request: Request, response: Response) => {

  var option = new Option({
    helperText:  request.body.helperText,
    value:  request.body.value
  });

  option.save(function (err) {
    if (err) return console.error(err);
    response.render("Success! Option added.")
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
    response.render("Success! Field added.")
  });

});

// Make the initial Form
formRouter.post("/form/:id", (request: Request, response: Response) => {

  var form = new Form(
    {
      id: request.params.id
    }
  );

  form.save(function (err) {
    if (err) return console.error(err);
    response.render("Success! Form added.")
  });

});

// Make an Item to be assessed
formRouter.post("/item", (request: Request, response: Response) => {

  var item = new Item(
    {
      address: request.body.address,
      addressId: encodeURI(request.body.address),
      score: 0,
      form: request.body.form
    }
  );

  item.save(function (err) {
    if (err) return console.error(err);
    response.render("Success! Item added.")
  });

});

// Returns all fields
formRouter.get("/field", (request:Request, response: Response) => {

  let res = {}

  Field.find(function (err, items){
    if (err) return console.error(err);
    res = items;
  });

  return response.json(res);
});

// Returns all Items
formRouter.get("/item", (request:Request, response: Response) => {

  let res = {}

  Item.find({ form: request.body.form }, function (err, items){
    if (err) return console.error(err);
    res = items;
  });

  return response.json(res);
});

// Returns the form
formRouter.get("/form/:id", (request:Request, response: Response) => {

  let res = {}

  Form.find({ id: request.params.id }, function (err, items){
    if (err) return console.error(err);
    res = items;
  });

  return response.json(res);
});

// Updates an item
formRouter.put("/item/:addressid", (request:Request, response: Response) => {

  let item = new Item({});

  Item.find({ addressID: request.params.addressid }, function (err, items){
    if (err) return console.error(err);
    item = items[0];
  });

  item.save(function (err) {
    if (err) return console.error(err);
    response.render("Success! Item updated.")
  });

});

// Updates a form
formRouter.put("/form/:id", (request:Request, response: Response) => {

  let form = new Form({});

  form = request.body.form;

  form.save(function (err) {
    if (err) return console.error(err);
    response.render("Success! Form updated.")
  });

});

export { formRouter };
