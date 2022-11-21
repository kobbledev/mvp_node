const mongoose = require("mongoose");
/**
 * @author Praveen
 * State model
 */
const StatesSeqSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
});
module.exports = mongoose.model("states", StatesSeqSchema, "states");
