define(function () {
    /* orderData takes care of getting the data from the orderDetails.json and populates the orderTableView */
    
    var orderData = {
        
        init: function () {
            this.totalCostForDelivery = 0;
            this.totalCostWithoutDelivery = 0;
            this.length = 0;
            this.items = null;
            this.getFromServer();
            this.displayNumberInCart();
        },
        
        getFromServer: function () {
            var self = this;
            $.getJSON('js/orderDetails.json', function (data) {
                self.items = data.item;
                self.length = data.item.length;
                orderTableView.render();
                $.each(data.item, function (index, element) {
		          self.totalCostForDelivery = self.totalCostForDelivery + Number(element.deliveryDetails);
                  self.totalCostWithoutDelivery = self.totalCostWithoutDelivery + Number(element.cost);
	            });
                orderData.displayNumberInCart();
            });
        },
        
        displayNumberInCart: function () {
            $('#totalCostOfCart').text("Rs " + this.totalCostWithoutDelivery);
            $('#numberInCart').text(this.length);
        }
    };
    
    var orderTableView = {
        
        init: function () {
            this.el = document.createElement('div');
        },
        //Delivered by 10th Dec 2016
        tmpl: `
            <div>
            <table class="table table-striped table-hover">
			     <thead>
							<tr>
								<th>#</th>
								<th>Item</th>
								<th>Quantity</th>
								<th>Delivery Details</th>
								<th>Cost</th>
							</tr>
						</thead>
						<tbody>
                            {{#items}}
                                 <tr>
                                     <td>{{id}}</td>
                                     <td>{{itemName}}</td>   
                                     <td>{{quantity}}</td>
                                     <td>Rs {{deliveryDetails}} <br> <sub>Delivered by {{deliveryDate}}</sub></td>
                                     <td>Rs {{cost}}</td>
                                 </tr>
                            {{/items}}
						</tbody>
					</table>
                </div> 
        `,
        
        render: function() {
            var self = this;
            this.el.innerHTML = Mustache.render(this.tmpl, orderData);
            return this;
        }
        
    };
    
    window.orderTableView = orderTableView;
    
    
    var orderSummaryView = {
        
        init: function () {
            this.el = document.createElement('div');
            this.totalCostForDelivery = 0;
            this.totalCostWithoutDelivery = 0;
            this.numberInCart = 0;
        },
        
        tmpl: `
              <div class="panel panel-success">	
							<div class="panel-heading"><strong>Order summary</strong></div>
							<div class="panel-body">
								<span><h6><strong>You'll find your order details below:</strong><h6></span>
								<div class="table-responsive">
									<table class="table table-condensed table-borderless">		
										<tbody>
											<tr>
												<td>Items</td>
												<td><span id="numberOfItems"></span></td>
											</tr>
											<tr>
												<td>Delivery</td>
												<td>Rs <span id="totalCostForDelivery"></span></td>
											</tr>		
										</tbody>
										<tfoot>
											<tr>
												<td>Total</td>
												<td>Rs <span id="totalCostWithDelivery"></td>
											</tr>	
										</tfoot>
									</table>
								</div>
								
								<div>
									<img src="img/location.png" alt="...">
								</div>
								<div class="well"><strong>The Shipping address</strong> 
									<br>10/3, Prasiddi, Gangamma temple street, NR colony, Ashoknagar, Bangalore - 560076
								</div>
							</div>
				</div>
        `,
        
        render: function () {
            this.el.innerHTML = Mustache.render(this.tmpl);
            this.fillValues();
            return this;
        },
        
        fillValues : function(){
            var self = this;
            $.getJSON('js/orderDetails.json', function(data) {
	        $.each(data.item, function(index, element){
                self.totalCostForDelivery = self.totalCostForDelivery + Number(element.deliveryDetails);
		        self.totalCostWithoutDelivery = self.totalCostWithoutDelivery + Number(element.cost);
	           });
	        self.numberInCart = data.item.length;	
	        $('#numberOfItems').text(self.numberInCart);
	        $('#totalCostForDelivery').text(self.totalCostForDelivery);
	        $('#totalCostWithDelivery').text(self.totalCostWithoutDelivery + self.totalCostForDelivery);
          });
        }
        
    };
    
    return {
        init: function() {
            orderData.init();
            orderTableView.init();
            orderSummaryView.init();
        },
        orderTableView: orderTableView,
        orderSummaryView: orderSummaryView
    };
    
    
});