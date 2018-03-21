var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// a database validation function
var nameValidation = function(val) {
	console.log("Inside name validation");
	console.log(val);

	if (val=="") return false; // if it's an empty string, return false
	else return true;
}

var optionSchema = new Schema({
  helperText: { type: String },
  value: { type: Number },
})

var fieldSchema = new Schema({
  order: { type: Number, required: true },
  type: { type: String, lowercase: true, required: true },
  question: { type: String, default: '' },
  options: [{ type: optionSchema }],
  value: { type: Number, default: 0},
  multiplier: { type: Number, required: true, default: 0 },
  maxValue: { type: Number, required: true, default: 0},
  disabled: { type: Boolean, required: true, default: false}
})

var formSchema = new Schema({
  id: { type: String, required: true, unique: true, validate: [nameValidation, 'Name cannot be blank.'] },
  fields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Field'}]
})

var itemSchema = new Schema({
  address: { type: String, required: true, unique: true, validate: [nameValidation, 'Name cannot be blank.']},
  addressID: {type: String, unique: true },
  score: { type: Number, default: 0 },
  form: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form'}]
})

// export models so we can interact with it in other files
const Option = mongoose.model('Option',optionSchema);
const Field = mongoose.model('Field',fieldSchema);
const Form = mongoose.model('Form',formSchema);
const Item = mongoose.model('Item',formSchema);

export { Option, Field, Form, Item };
