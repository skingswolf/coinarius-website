import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

const onSuccess = (payment) => {
  console.log("Payment successful!", payment);
};
const onCancel = (data) => {
  // The user pressed "cancel" or closed the PayPal popup
  console.log("Payment cancelled!", data);
};
const onError = (err) => {
  // The main Paypal script could not be loaded or something blocked the script from loading
  // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
  // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  console.log("Error!", err);
};

let env = "sandbox"; // you can set this string to 'production'
let currency = "GBP"; // you can set this string from your props or state
let total = 1; // this is the total amount (based on currency) to charge
// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

const client = {
  sandbox: "ASqgW6tlaF3sljgwFzMAisCCeHlMAGD1UiyAXNpg1G7BXzQtmT2QMReL4BCekHo8eFjowYzi91t0I4xS"
};
const style = {
  size: "large",
  color: "gold",
  shape: "pill",
  label: "checkout"
};

const PaypalCheckout = () => (
  <PaypalExpressBtn
    env={env}
    client={client}
    currency={currency}
    total={total}
    onError={onError}
    onSuccess={onSuccess}
    onCancel={onCancel}
    style={style}
  />
);

export default PaypalCheckout;
