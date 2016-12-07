Steps to run this project:
    1. Install a tomcat server and place this in its webapp's folder
    2. Start the tomcat server
    3. Open a browser and hit http://localhost:8080/Payment-Module/ OR http://127.0.0.1:8080/Payment-Module/ 
    4. It will now load the index.html

Description:
The index.html page loads the Order Summary page in the module. This order summary details are populated from the data in orderDetails.json. One can add more data to the orderDetails.json and see how it gets updated on the Order Summary page. Once the items are verified one can proceed by clicking "Proceed to Payment" which then takes one to the Payment Methods page. Here, by default the Wallet option is chosen. You can verify your order summary details one last time. The order summary gives the total payable amount including the delivery charges. If the wallet is chosen, one can check that there's enough balance in the Wallet (this is populated after getting the balance from the paymentMethods.json), enter required values and complete the payment. If one chooses to pay by Debitcard, click the Debitcard option on the left sidebar and the debitcard panel shows up. Enter the details and finish the payment. A successful transaction will show a success message. And, in other cases, it'll show a failure message.

How to add another payment method?
1. Create a javascript file, say creditcard.js and write the entire processor logic and the view logic in this file and save it in the js folder
2. In the paymentMethods.js file, which is the where we control the logic of paymentMethods.html, add code like this,
    a. Add the 'creditcard' to the dependencies in the define() and when it's done it'll look like this, ['wallet','debitcard', 'creditcard', 'order'] and the function(wallet,debitcard,creditcard,order)
    b. Also, add: 
     creditcard.init();
     $('#creditcard').click(function () {
        $('#walletClick').html(creditcard.creditcardView.render().el);
        creditcard.creditcardView.bindEventListeners();
    });
    
3. In the paymentMethods.html, I've already added a <li><a href="#" id="creditcard">Credit Card</a></li> in the sidebar for credit card option but any other method can be added with ease.