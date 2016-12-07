define(['order'], function (order) {
    
    order.init();
    $('#orderDetails').append(order.orderTableView.render().el);
    
});