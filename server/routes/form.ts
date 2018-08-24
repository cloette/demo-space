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

/*/ Make a new option
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

});*/

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

// Returns the form
formRouter.get("/form/:id", (request: Request, response: Response) => {

  console.log("GET form " + JSON.stringify(request.params.id));

  Form.find({ id: request.params.id }, function (err, items) {
    if (err) return console.error(err);
    console.log("items returned: " + JSON.stringify(items));
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

  console.log("PUT form " + JSON.stringify(request.body));

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

  console.log("POST item " + JSON.stringify(request.body));

});

// Updates an item
formRouter.put("/item", (request: Request, response: Response) => {

  Item.update({ addressid: request.body.addressid }, { $set: { form: request.body.form, formid: request.body.formid, score: request.body.score } }, function (err) {
    if (err) return console.error(err);
    response.json({ message: "Success!" });
  });

  console.log("PUT item " + JSON.stringify(request.body));

});

// Returns one item
formRouter.get("/item/:addressid", (request: Request, response: Response) => {

  let res;

  Item.find({ address: request.body.addressid }, function (err, items) {
    if (err) return console.error(err);
    res = items[0];
    console.log("GET item response " + JSON.stringify(items[0]));
    return response.json(res);
  });

  console.log("GET item " + JSON.stringify(request.params.addressid));
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

  Item.findOneAndDelete({ address: request.params.addressid }, function (err, items) {
    if (err) return console.error(err);
  });

  console.log("DELETED item " + JSON.stringify(request.params.addressid));

});

export { formRouter };
