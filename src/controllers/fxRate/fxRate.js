const FxRate =  require('../../models/fxRate/fxRate.js');
const services =  require('../../services/index.js')

exports.list = (req, h) => {
  return FxRate.find({}).exec().then((fxRate) => {
    return { fxRates: fxRate };
  }).catch((err) => {
    return { err: err };
  });
}


exports.get = (req, h) => {

  return FxRate.findById(req.params.id).exec().then((fxRate) => {

    if(!fxRate) return { message: 'Rate not Found' };

    return { fxRate: fxRate };

  }).catch((err) => {

    return { err: err };

  });
}

exports.create = async (req, h) => {

  const fxRateData = {
    pair: req.payload.pair,
    feePct: req.payload.feePct,
  };  

  fxRateData.originalRate = await services.fixerio.getPairRate(fxRateData.pair);
  fxRateData.feeAmount = fxRateData.originalRate * fxRateData.feePct;
  fxRateData.rateWithMarkUp = fxRateData.originalRate + fxRateData.feeAmount;


  return FxRate.create(fxRateData).then((fxRate) => {

     return { message: "Rate created successfully", fxRate: fxRate };

  }).catch((err) => {

    return { err: err };

  });
}


exports.update = (req, h) => {

  return FxRate.findById(req.query.id).exec().then( async (fxRateDoc) => {

    if (!fxRateDoc) throw new Error('Rate ID not found');

    fxRateDoc.feePct = req.query.feePct,
    fxRateDoc.originalRate = await services.fixerio.getPairRate(fxRateDoc.pair);
    fxRateDoc.feeAmount = fxRateDoc.originalRate * fxRateDoc.feePct;
    fxRateDoc.rateWithMarkUp = fxRateDoc.originalRate + fxRateDoc.feeAmount;

    fxRateDoc.save();

  }).then(() => {
      return { message: "Rate data updated successfully" };
  }).catch((err) => {
    console.log(err.message)
    return { err: err };
  });
}

exports.remove = (req, h) => {

  return FxRate.findById(req.params.id).exec(function (err, fxRate) {
    if (err) return { dberror: err };
    if (!fxRate) return { message: 'Rate not found' };
    fxRate.remove(function (err) {
      if (err) return { dberror: err };
      return { success: true };
    });
  });
}