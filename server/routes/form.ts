import { Request, Response, Router } from "express";
import * as uuid from "uuid";

import { Option, Field, Form, Item } from "../models/model.js";

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
    helperText:  request.params.helperText,
    value:  request.params.value
  });

  option.save(function (err) {
    if (err) return console.error(err);
    response.render("Success! Option added.")
  });

});

// Make a new field
formRouter.post("/field", (request: Request, response: Response) => {

  var field = new Field({
    order: request.params.order,
    type: request.params.type,
    question: request.params.question,
    options: request.params.options,
    multiplier: request.params.multiplier,
    maxValue: request.params.maxValue,
    disabled: false
  });

  field.save(function (err) {
    if (err) return console.error(err);
    response.render("Success! Field added.")
  });

});

// Make the initial Form
formRouter.post("/form", (request: Request, response: Response) => {

  var form = new Form();

  form.save(function (err) {
    if (err) return console.error(err);
    response.render("Success! Form added.")
  });

});

// Make an Item to be assessed
formRouter.post("/item", (request: Request, response: Response) => {

  var item = new Item(
    {
      address: request.params.address,
      addressId: encodeURI(request.params.question),
      score: 0,
      form: request.params.form
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

  Item.find(function (err, items){
    if (err) return console.error(err);
    res = items;
  });

  return response.json(res);
});

// Returns the form
formRouter.get("/form", (request:Request, response: Response) => {

  let res = {}

  Form.find(function (err, items){
    if (err) return console.error(err);
    res = items;
  });

  return response.json(res);
});

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

export { formRouter };
