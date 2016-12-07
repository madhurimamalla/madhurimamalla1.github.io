define (function () {
    
    var processorWallet = {
        
        init: function (walletAmount, walletInputAmount) {
            this.walletAmount = walletAmount;
            this.walletInputAmount = walletInputAmount;
            this.payWallet = false;
        },
                
        validate: function () {
        },
        
        process: function () {
            if(this.walletInputAmount <= this.walletAmount){
                this.payWallet = true;
            }
            if(this.payWallet == true){
                $('#walletClick').load("transactionSuccessNotification.html");
            }
            else {
                $('#walletClick').load("transactionFailureNotification.html");
            }
        }    
    };
    
    window.processorWallet = processorWallet;
    
    var walletView = {
		
        init: function() {
			this.el = document.createElement('div');
            this.walletBalance = 0;
		},
        
        tmpl: `
				        <div>
                            <div class="panel panel-primary">
								<div class="panel-heading">
									<h3 class="panel-title">My Wallet</h3> <!-- Money remaining in wallet -->
								</div>
								<div class="panel-body">
									<div class="well">Amount remaining in Wallet : <strong>Rs <span id="balanceWalletAmount"></span></strong></div>
									<div class="alert alert-warning" role="alert">
										<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
										<strong>Hey there!</strong> Does your wallet have enough money?
									</div>
									<div class="checkbox">
										<label>
											<input type="checkbox"> Check if you want to pay using the wallet <!-- Have another check if the checkbox is checked or not? It needs to be checked to complete payment-->
										</label>
									</div>
									<form class="form-inline" id="walletForm">
										<div class="form-group">
											<div class="input-group">
												<div class="input-group-addon">Rs</div>
												<input type="text" class="form-control" pattern="[0-9]+" id="inputWalletAmount" placeholder="Amount" required autofocus>
												<div class="input-group-addon">.00</div>
											</div>
										</div>
									<button type="submit" class="btn btn-primary" id="payByWallet">Pay now</button>
									</form>
								</div>
							</div>
                        </div>
        `,
        

		render: function() {
            var self = this;
            this.el.innerHTML = Mustache.render(this.tmpl);
            $.getJSON('js/paymentMethods.json',function(data) {
		       $.each(data.paymentMethod,function(index, element)  {
		          if(element.paymentMethod == "Wallet"){
			         self.walletBalance = Number(element.Balance);
		          }
                console.log("Wallet Balance: " + self.walletBalance);
                $('#balanceWalletAmount').text(self.walletBalance);
	           });
            });
            return this;
		  },
        
        bindEventListeners: function () {
           $.ajaxSetup ({cache: false});
           $('#walletForm').submit(function(e){console.log("preventing reloading"); e.preventDefault();});
           $('#payByWallet').click(function() { 
                if($('#inputWalletAmount').val() > 0){
                processorWallet.validate();    
                processorWallet.init(walletView.walletBalance,$('#inputWalletAmount').val());
        		processorWallet.process();
              }
             });
            return this;
        }
        
	   };
    
    window.walletView = walletView;
       
    return {
        init: function() {
            walletView.init();
            walletView.render();
        },
        
        walletView: walletView
        
        };

});
