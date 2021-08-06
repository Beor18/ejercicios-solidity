const { Payment } = require("../models/Payment");

const items = {
  1: { id: 1, url: "http://UrlToDownloadItem1" },
  2: { id: 2, url: "http://UrlToDownloadItem2" },
};

async function getPaymendId(req, res, next) {
  try {
    //1. generate paymentId randomly
    const paymentId = (Math.random() * 10000).toFixed(0);
    //2. save paymentId + itemId in mongo
    await new Payment({
      id: paymentId,
      itemId: req.params.itemId,
      paid: false,
    });
    //3. return paymentId to sender
    res.status(200).json({
      paymentId,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getItemUrl(req, res) {
  try {
    //1. verify paymentId exist in db and has been paid
    // ¡¡¡¡ VER ERROR EN ESTE CONST PAYMENT !!!!
    const payment = await Payment.findOne({ id: req.params.paymentId });
    console.log("fernando payment >>>> ", payment);
    //2. return url to download item
    if (payment && payment.paid === true) {
      res.status(200).json({
        url: items[payment.itemId].url,
      });
    } else {
      res.status(200).json({
        url: "",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPaymendId,
  getItemUrl,
};
