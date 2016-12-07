define(function () {
    
    var random = [true, false],
    isThrough = Math.floor(Math.random() * random.length + 1);
    
    var processorDebit = {
	
		init : function (inputDebitAmount, mPin, cardNumber) {
			this.inputDebitAmount = inputDebitAmount;
			this.mPin = mPin;
			this.cardNumber = cardNumber;
		},
		
		process : function () {
			if (this.payDebitCard == true) {
				$('#walletClick').load("transactionSuccessNotification.html");
			}
			else {
				$('#walletClick').load("transactionFailureNotification.html");
			}
		},
		
		validate : function () {
			// This should contact the database and give if it's a valid mPin and transaction can go through; Using mPin, cardNumber;
			this.payDebitCard = isThrough;
		}
    };
    
    window.processorDebit = processorDebit;
    
    var debitcardView = {
		
        init: function () {
			this.el = document.createElement('div');
		},
        
        tmpl: `
				   <div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">My Debit Card</h3> 
						</div>
						
						<div class="panel-body">
						  	<form class="form-inline" id="debitForm">
								<!-- For entering the card holder's details -->
								<div class="form-group">
									<label for="cardNumber">CARD NUMBER</label>
									<div class="input-group">
										<input type="text" class="form-control" id="cardNumber" pattern="[0-9]{12}" placeholder="Valid Card Number" maxlength="12" minlength=12 required autofocus />
										<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
									</div>
								</div>
								<br>
								<!-- For entering the M-PIN -->
								<br>
								<div class="form-group-sm">
									<label for="mpin">M-PIN</label>
									<div class="input-group">
										<input type="password" class="form-control" pattern="[0-9]{4}" id="mpin" placeholder="XXXX" maxlength="4" minlength=4 required autofocus />
										<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
									</div>
								</div>
								</br>
								<!-- The value to be paid will need to be retrieved from previous page -->	
								<div class="form-group">
									<div class="input-group">
										<div class="input-group-addon">Rs</div>
										<input type="text" class="form-control" pattern="[0-9]+" id="inputDebitAmount" placeholder="Amount" maxlength=10 required autofocus>
										<div class="input-group-addon">.00</div>
									</div>
								</div>
								<button type="submit" class="btn btn-primary" id="payByDebitCard">Pay now</button>
						    </form> 
							<div class="checkbox">
								<label>
									<input type="checkbox"> Remember <!-- If remember is set, save the card holder's card number for future -->
								</label>
							</div>
							<div class="alert alert-info" role="alert">
								<strong>Hi!</strong> Want to save your card details?
							</div>
						</div>
					</div>
        `,
        
		render: function () {
            this.el.innerHTML = Mustache.render(this.tmpl);
            return this;
		  },
        
        bindEventListeners: function () {
            $('#payByDebitCard').click(function () {
                if($('#cardNumber').val() > 0 && $('#mpin').val() > 0 && $('#inputDebitAmount').val() > 0){
						processorDebit.init($('#inputDebitAmount').val(),$('#mpin').val(),$('#cardNumber').val());
						processorDebit.validate();
						processorDebit.process();
					}
            });
            return this;
        }
        
	   };
    
    window.debitcardView = debitcardView;
       
    return {
        init: function() {
            debitcardView.init();
            debitcardView.render();
        },
        
        debitcardView: debitcardView
        
        };
    
});