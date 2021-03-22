const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fxRateModel = new Schema({
  pair: { type: String, required: true, index: { unique: true } },
  originalRate: { type: Number, required: true},
  feePct: { type: Number, required: true },
  feeAmount: { type: Number, required: true},
  rateWithMarkUp: { type: Number, required: true },
});

module.exports = mongoose.model('FxRate', fxRateModel, 'fxRates'); 