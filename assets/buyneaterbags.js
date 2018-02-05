$(document).ready(function () {


    //JS script for neaterbags

    // dispensers Id
    var dispensersId = [];
    var inputDispensers = $("input[name='dispensers']");
    for (var i = 0; i < inputDispensers.length; i++) {
        dispensersId.push(inputDispensers[i].value);
    }

    //freedispensers Id
    var freedispensersId = [];
    var inputFreedispensers = $("input[name='freedispensers']");
    for (var i = 0; i < inputFreedispensers.length; i++) {
        freedispensersId.push(inputFreedispensers[i].value);
    }

    //neaterfeeders Id
    var neaterfeedersId = [];
    var inputNeaterfeeders = $("input[name='bonusoffer']");
    for (var i = 0; i < inputNeaterfeeders.length; i++) {
        if (inputNeaterfeeders[i].value !== "nobonusoffer") {
            neaterfeedersId.push(inputNeaterfeeders[i].value);
        }
    }





    //Add to Cart
    function addToCartNb(prodVariantId, prodQuantity) {

        let url = '/cart/add.js';
        let data = {
            quantity: prodQuantity,
            id: prodVariantId

        };

        $.ajax({
            url: url,
            data: data,
            method: "POST",
            dataType: 'json',
            async: false
        });
    }

    //Redirect to cart
    function cartRedirect() {
        location.href = "/cart"
    }

    //Update cart
    function updateCartNb(data) {
        $.ajax({
            url: '/cart/update.js',
            type: "POST",
            data: {updates: data},
            dataType: 'json',
            async: false,
            success: function () {
                putCartToTableNb();
            }
        });
    }

    //AJAX Cart to Table
    function putCartToTableNb() {
        $.getJSON('/cart.js', function (cart) {
            var product_rows = cart.items;
            var row = '';
            $('.reviewTableBody').html(row);
            var price = 0;
            var order_total = 0;

            console.log(product_rows);

            for (var i = 0; i < product_rows.length; i++) {
                var title = product_rows[i].title;
                var quantity = +product_rows[i].quantity;
                price = product_rows[i].price * .01;
                var total_price = quantity * price;
                order_total += +total_price;
                var product_id = product_rows[i].id;
                var href_del = "/cart/change?id=" + product_id + "&quantity=0";


                //row += "<tr><td>" + title + "</td><td>" + quantity + "</td><td>" + total_price + "</td><td>P&H</td><td><a href=" + href_del + " class='del'>Delete</a></td></tr>";
//                            row += "<tr><td id='product_name'>" + title + "</td><td id='" + product_id + "' class='" + product_id + " product'>" + quantity + "</td><td>" + total_price.toFixed(2) + "</td><td>P&H</td><td><a href=" + href_del + " class='del' id='" + product_id + "'>Delete</a></td></tr>";
                row = "<tr><td id='product_name'>" + title + "</td><td id='" + product_id + "' class='" + product_id + " product'>" + "<span>" + quantity + "</span>" + "</td><td>" + total_price.toFixed(2) + "</td></tr>";//<td></td>


                $('.reviewTableBody').append(row);

            }

            $('.ordertotal').text(order_total.toFixed(2));

        });

    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    if (getCookie("cart")) {
        putCartToTableNb();
    }


    //Clear dispensers from cart
    function clearDispensersAddOneNb(data) {
        $.ajax({
            url: '/cart/update.js',
            type: "POST",
            data: {updates: data},
            dataType: 'json',
            async: false,
            success: function () {
                var selectedDispenser = $("input[name='dispensers']:checked").val();
                addToCartNb(selectedDispenser, 1);
                putCartToTableNb();
            }
        });
    }

    //Clear freedispensers from cart
    function clearFreedispensersAddOneNb(data) {
        $.ajax({
            url: '/cart/update.js',
            type: "POST",
            data: {updates: data},
            dataType: 'json',
            async: false,
            success: function () {
                var selectedFreedispenser = $("input[name='freedispensers']:checked").val();
                addToCartNb(selectedFreedispenser, 1);
                putCartToTableNb();
            }
        });
    }

    //Clear neaterfeeders from cart
    function clearNeaterfeedersAddOneNb(data) {
        $.ajax({
            url: '/cart/update.js',
            type: "POST",
            data: {updates: data},
            dataType: 'json',
            async: false,
            success: function () {
                var selectedNeaterfeeder = $("input[name='bonusoffer']:checked").val();
                if (selectedNeaterfeeder !== "nobonusoffer") {
                    addToCartNb(selectedNeaterfeeder, 1);
                }
                putCartToTableNb();
            }
        });
    }



    //Action: add dispenser to Cart
    $("input[name='dispensers']:radio").on("change", function () {
        if (dispensersId) {
            var objDeleteDispensersCart = {};
            dispensersId.forEach(function (item, i, arr) {
                objDeleteDispensersCart[item] = 0;
            });
        }

        clearDispensersAddOneNb(objDeleteDispensersCart);

    });

    //Action: add freedispenser to Cart
    $("input[name='freedispensers']:radio").on("change", function () {
        if (freedispensersId) {
            var objDeleteFreedispensersCart = {};
            freedispensersId.forEach(function (item, i, arr) {
                objDeleteFreedispensersCart[item] = 0;
            });
        }

        clearFreedispensersAddOneNb(objDeleteFreedispensersCart);

    });

    //Action: add neaterfeeder to Cart
    $("input[name='bonusoffer']:radio").on("change", function () {
        if (neaterfeedersId) {
            var objDeleteNeaterfeedersCart = {};
            neaterfeedersId.forEach(function (item, i, arr) {
                objDeleteNeaterfeedersCart[item] = 0;
            });
        }
        clearNeaterfeedersAddOneNb(objDeleteNeaterfeedersCart);

    });

   //Action: on load add checked neaterfeeder and default freebags
   var freebagsId =  $("input[name='freebags']").data('productvariantid');
   var freebagsObj = {};
   freebagsObj[freebagsId] = 1;
   updateCartNb(freebagsObj);

   var checkedNeaterFeederId = $("input[name='bonusoffer']:checked").data('productvariantid');

   if (checkedNeaterFeederId) {
        var objDeleteNeaterfeedersCart = {};
        neaterfeedersId.forEach(function (item, i, arr) {
            objDeleteNeaterfeedersCart[item] = 0;
        });
        clearNeaterfeedersAddOneNb(objDeleteNeaterfeedersCart);
    }




    //Action: accept offer for bags
    $("#ns-popup #acceptOffer").on("click", function(e){
        e.preventDefault();
        var addBagId = $("#ActionQuantity0").data("addbagid");
        var addBagQuantity = $("#ActionQuantity0 option:selected").text();
        addToCartNb(addBagId, addBagQuantity);
        $('#ns-popup').arcticmodal("close");
        $('#nb-popup-priority').arcticmodal();
    });

    //Action: popup call
    $(".info_popupContinue").on("click", function (e) {
        e.preventDefault();
        var selectedDispenser = $("input[name='dispensers']:checked").data("productvariantid");
        var selectedFreeDispenser = $("input[name='freedispensers']:checked").data("productvariantid");
        if(selectedDispenser && selectedFreeDispenser){
            $('#warning').hide();
            $('#ns-popup').arcticmodal();
        }
        else{
            // $('#nb-popup-no-choice').arcticmodal();
            $('#warning').show();
        }
    });

    //Action: reject offer bags
    $("#ns-popup #rejectOffer").on("click", function(e){
        e.preventDefault();
        $('#ns-popup').arcticmodal("close");
        $('#nb-popup-priority').arcticmodal();
    });


    //Action: reject offer priority
    $("#nb-popup-priority #rejectOffer").on("click", function(e){
        e.preventDefault();
        $('#nb-popup-priority').arcticmodal("close");
        var priorityId = $(this).data("priorityid");
        var objPriorityDelete = {};
        objPriorityDelete[priorityId] = 0;
        updateCartNb(objPriorityDelete);
        cartRedirect();
    });

    //Action: accept offer priority
    $("#nb-popup-priority #acceptOffer").on("click", function(e){
        e.preventDefault();
        var priorityId = $(this).data("priorityid");
        var objPriorityDelete = {};
        objPriorityDelete[priorityId] = 0;
        updateCartNb(objPriorityDelete);
        addToCartNb(priorityId, 1);
        $('#nb-popup-priority').arcticmodal("close");
        cartRedirect();
    });

    //Clear cart
    function clearCartNb() {
        $.ajax({
            url: "/cart/clear.js",
            type: "POST",
            async: false
        });
    }

    //Action: clear cart afterlogo click
    $("#logo img").on("click", function (e) {
        e.preventDefault();
        clearCartNb();
        location.href = "/";
    });

    $("#clear-btn").on("click", function (e) {
        e.preventDefault();
        clearCartNb();
        location.href = "/";
    });


    // Smooth scrolling
    $(document).on('click', 'a[href*=#]:not([href=#])', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
        }, 700);

        return false;
    });

});
