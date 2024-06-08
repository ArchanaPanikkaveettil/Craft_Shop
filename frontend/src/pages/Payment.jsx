import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/payment.css'
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';



export default function Payment() {

  const [paymentMethod, setPaymentMethod] = useState('');
  console.log('paymentMethod', paymentMethod);

  const PaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  //UPI QR------------------------{
  const receiverUpiId = 'archanapbalachandran@oksbi';
  const amount = sessionStorage.getItem('TotalAmount');

  const upiUrl = `upi://pay?pa=${encodeURIComponent(receiverUpiId)}&pn=${encodeURIComponent('Receiver Name')}&am=${amount}&cu=INR`;
  //--------------------------}


  //credit card validation-------------------------{
  const [creditcardInput, setCreditcardInput] = useState({

    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCVV: '',
  });
  console.log(creditcardInput);

  const creditCardInputChange = (e) => {

    const { name, value } = e.target;
    setCreditcardInput({ ...creditcardInput, [name]: value });
  }

  const [errors, setErrors] = useState({})
  console.log('Errors', errors);

  const CardValidate = (data) => {

    var error = {};

    //credit card validate
    if (!creditcardInput.creditCardNumber) {
      error.creditCardNumber = 'Credit Card Number is required';
    }
    else if (creditcardInput.creditCardNumber.length < 16) {
      error.creditCardNumber = 'Credit Card Number should be 16 digits';
    }
    else if (creditcardInput.creditCardNumber.length > 16) {
      error.creditCardNumber = 'Credit Card Number should be 16 digits';
    }
    //digitsonly
    else if (isNaN(creditcardInput.creditCardNumber)) {
      error.creditCardNumber = 'Type only digits';
    }


    if (!creditcardInput.creditCardExpiry) {
      error.creditCardExpiry = 'Credit Card Expiry is required';
    }
    else if (!creditcardInput.creditCardExpiry.match(/^(0[1-9]|1[0-2])\/[0-9]{4}$/)) {
      error.creditCardExpiry = 'Format of Credit Card Expiry should be MM/YYYY';
    }


    if (!creditcardInput.creditCardCVV) {
      error.creditCardCVV = 'Credit Card CVV is required';
    }
    //format
    else if (!creditcardInput.creditCardCVV.match(/^[0-9]{3,4}$/)) {
      error.creditCardCVV = 'Format of Credit Card CVV should be 3 or 4 digits';
    }
    else if (isNaN(creditcardInput.creditCardCVV)) {
      error.creditCardCVV = 'Type only digits';
    }

    //----------------------debit card validate

    if (!debitcardInput.debitCardNumber) {
      error.debitCardNumber = 'Debit Card Number is required';
    }
    else if (debitcardInput.debitCardNumber.length < 16) {
      error.debitCardNumber = 'Debit Card Number should be 16 digits';
    }
    else if (debitcardInput.debitCardNumber.length > 16) {
      error.debitCardNumber = 'Debit Card Number should be 16 digits';
    }
    //digitsonly
    else if (isNaN(debitcardInput.debitCardNumber)) {
      error.debitCardNumber = 'Type only digits';
    }


    if (!debitcardInput.debitCardExpiry) {
      error.debitCardExpiry = 'Debit Card Expiry is required';
    }
    else if (!debitcardInput.debitCardExpiry.match(/^(0[1-9]|1[0-2])\/[0-9]{4}$/)) {
      error.debitCardExpiry = 'Format of Debit Card Expiry should be MM/YYYY';
    }


    if (!debitcardInput.debitCardCVV) {
      error.debitCardCVV = 'Debit Card CVV is required';
    }
    //format
    else if (!debitcardInput.debitCardCVV.match(/^[0-9]{3,4}$/)) {
      error.debitCardCVV = 'Format of Debit Card CVV should be 3 or 4 digits';
    }
    else if (isNaN(debitcardInput.debitCardCVV)) {
      error.debitCardCVV = 'Type only digits';
    }


    return error;

  }
  //------------------------------}



  //debit card validation---------------------{

  const [debitcardInput, setDebitcardInput] = useState({
    debitCardNumber: '',
    debitCardExpiry: '',
    debitCardCVV: '',
  });
  console.log(debitcardInput);

  const debitCardInputChange = (e) => {

    const { name, value } = e.target;
    setDebitcardInput({ ...debitcardInput, [name]: value });
  }



  //--------------------------------}


  const navigate = useNavigate();

  //On Submit
  const OnPay = () => {
    setErrors(CardValidate(creditcardInput));
    setErrors(CardValidate(debitcardInput));

    if (Object.keys(errors).length == 0) {
      navigate('/paymentsuccess');
    }
  }








  return (
    <>
      <Navbar />
      <div id='paymentpage'>
        <div class='row' id='paymentsub'>

          <div class='col-lg-6'>
            <h5>Payment Amount</h5>
            <h5>Rs {amount}</h5>
            <hr style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255, 255, 255, 0.372)' }} />
            <p>Invoice ID: SN8478042099</p>
            <p>Next payment: 22 July, 2018</p>
            <p>Customer Support: online chat 24/7</p>
          </div>

          <div className='col-lg-6'>
            <h5>Payment Method</h5>

            <div className="form-check">


              <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" value="Credit Card" onChange={PaymentMethodChange} />
              <label className="form-check-label" htmlFor="creditCard"> Credit Card </label>
              <br />

              <input className="form-check-input" type="radio" name="paymentMethod" id="debitCard" value="Debit Card" onChange={PaymentMethodChange} />
              <label className="form-check-label" htmlFor="debitCard">
                Debit Card
              </label>
              <br />

              <input className="form-check-input" type="radio" name="paymentMethod" id="upi" value="UPI" onChange={PaymentMethodChange} />
              <label className="form-check-label" htmlFor="upi">
                UPI
              </label>
              <br />

            </div>

            {paymentMethod === 'Credit Card' && (
              <div className='mt-3'>
                <h5>Credit Card Details</h5>
                <div className="form-group">
                  <label htmlFor="creditCardNumber">Card Number</label>
                  <br />
                  <span style={{ color: errors.creditCardNumber ? 'red' : '' }}>{errors.creditCardNumber}</span>
                  <input type="text" className="form-control" id="creditCardNumber" name='creditCardNumber' placeholder="Enter card number" onChange={creditCardInputChange} onClick={() => { setErrors({ ...errors, creditCardNumber: "" }) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="creditCardExpiry">Expiration Date</label>
                  <br />
                  <span style={{ color: errors.creditCardExpiry ? 'red' : '' }}>{errors.creditCardExpiry}</span>
                  <input type="text" className="form-control" id="creditCardExpiry" name='creditCardExpiry' placeholder="MM/YYYY" onChange={creditCardInputChange} onClick={() => { setErrors({ ...errors, creditCardExpiry: "" }) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="creditCardCVV">CVV</label>
                  <br />
                  <span style={{ color: errors.creditCardCVV ? 'red' : '' }}>{errors.creditCardCVV}</span>
                  <input type="text" className="form-control" id="creditCardCVV" name='creditCardCVV' placeholder="CVV" onChange={creditCardInputChange} onClick={() => { setErrors({ ...errors, creditCardCVV: "" }) }} />
                </div>
              </div>
            )}

            {paymentMethod === 'Debit Card' && (
              <div className='mt-3'>
                <h5>Debit Card Details</h5>
                <div className="form-group">
                  <label htmlFor="debitCardNumber">Card Number</label>
                  <br />
                  <span style={{ color: errors.debitCardNumber ? 'red' : '' }}>{errors.debitCardNumber}</span>
                  <input type="text" className="form-control" id="debitCardNumber" name='debitCardNumber' placeholder="Enter card number" />
                </div>
                <div className="form-group">
                  <label htmlFor="debitCardExpiry">Expiration Date</label>
                  <br />
                  <span style={{ color: errors.debitCardExpiry ? 'red' : '' }}>{errors.debitCardExpiry}</span>
                  <input type="text" className="form-control" id="debitCardExpiry" name='debitCardExpiry' placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label htmlFor="debitCardCVV">CVV</label>
                  <br />
                  <span style={{ color: errors.debitCardCVV ? 'red' : '' }}>{errors.debitCardCVV}</span>
                  <input type="text" className="form-control" id="debitCardCVV" name='debitCardCVV' placeholder="CVV" />
                </div>
              </div>
            )}

            {paymentMethod === 'UPI' && (
              <div className='mt-3'>
                <h5>UPI Details</h5>
                <div className="form-group">
                  <label htmlFor="upiId">Scan QR Code</label>

                  <div style={{ height: "auto", margin: "20px auto", maxWidth: 200, width: "100%" }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={upiUrl}
                      viewBox={`0 0 256 256`}
                    />
                  </div>

                </div>
              </div>
            )}
          </div>

          {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
            <button type="submit" id='payamount' onClick={OnPay} className="btn btn-success mt-4">
              Pay Rs. {amount}
            </button>
          )}

        </div>
      </div>

    </>
  )
}
