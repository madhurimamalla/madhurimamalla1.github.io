### About:

<p>This module is an implementation of a payment in any e-commerce website. It concentrates only on the UI engineering of the payment module. </p>

<p>On loading the module, the Order Details page is displayed which gets all its details from the orderDetails.json. One can add more data to the orderDetails.json and see how the index.html updates. As the data is added and the index.html is refreshed, the total amount of the cart is also recalculated and updated. The next step is "Proceed to Payment" which is triggered by clicking the Payment button and that goes to the Payment Methods page. Presently, there are two ways to make the payment, 'Wallet' or 'Debitcard'. By default the Wallet option is chosen. The order summary details on the right give the total amount payable including the delivery charges and this can be verified one last time before proceeding. If the wallet is chosen, we see a remaining balance updated (this is populated by getting details such as balance from the paymentMethods.json). After which we need to enter required values and complete the payment. If the Debitcard option on the left sidebar is clicked, the debitcard panel shows up. Enter the details such as a 12 digit card number, a 4 digit MPIN, payable amount and complete the payment . A successful transaction will show a success message. And, in other cases, it'll show a failure message.<p>

<h4> Steps to run this module:</h4>

1. Download and install a tomcat server.
2. Clone/Pull this project and place it in the webapps folder of the tomcat server.
3. Start the tomcat server.
4. This page can be viewed on the 8080 port of your localhost.

#### Supported Browsers

<p> This is tested on Firefox and Chrome. </p>

### Adding a new payment method

1. Create a javascript file, say creditcard.js and write the entire processor logic and the view logic in this file and save it in the js folder.
2. In the paymentMethods.html, I've already added a   <code> &lt;li&gt;&lt;a href="#" id="creditcard"&gt;Credit Card&lt;/a&gt;&lt;li&gt;</code>  in the sidebar for credit card option but any other method can be added here with ease.
3. In the paymentMethods.js file, which is where we control the logic of paymentMethods.html, there are two things that need to be added,
    * Add the 'creditcard' to the dependencies in the define() and when it's done it'll look like this, ['wallet','debitcard', 'creditcard', 'order'] and then to the function to look like this function(wallet,debitcard,creditcard,order)
    * Also, add: 
     ``` creditcard.init(); 
     $('#creditcard').click(function () { 
        $('#walletClick').html(creditcard.creditcardView.render().el);
        creditcard.creditcardView.bindEventListeners();
    }); ```



