define(['wallet','debitcard','creditcard','order'], function (wallet, debitcard, creditcard, order) {
   
    /* By default the Wallet option */
    wallet.init();
    $('#walletClick').append(wallet.walletView.render().el);
    wallet.walletView.bindEventListeners();
        
    /* If the debit card option is clicked, the debit card panel shows up and you can enter the amount and pay */        
    debitcard.init();
    $('#debitcard').click(function () {
        $('#walletClick').html(debitcard.debitcardView.render().el);
        debitcard.debitcardView.bindEventListeners();
    });
   
    /* This is the credit card module easily plugged in */
    creditcard.init(); 
    $('#creditcard').click(function () { 
        $('#walletClick').html(creditcard.creditcardView.render().el); 
        creditcard.creditcardView.bindEventListeners(); 
    });
    
    /* Below code populates the Order Summary panel and its values */
    order.init();
    $('#orderSummaryTable').html(order.orderSummaryView.render().el);
    
    $(".nav-sidebar li").on("click", function() {
        $(".nav-sidebar li").removeClass("active");
        $(this).addClass("active");
    });
});