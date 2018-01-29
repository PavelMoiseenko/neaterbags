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
        $('#ns-popup').arcticmodal();
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

    //Action: after load page add/delete neaterfeeder product to/from Cart
    //$("input[name='bonusoffer']:radio")

    // var neaterfeederId = $("input[name='bonusoffer']:checked").val();
    // clearNeaterfeedersAddOneNb















































    // var isChecked = $("#cbxSelectProduct").prop("checked");
    // var productVariantId = $("#cbxSelectProduct").data("productvariantid");
    // var updateObj = {};
    // if (isChecked) {
    //     updateObj[productVariantId] = 1;
    // }
    // else {
    //     updateObj[productVariantId] = 0;
    // }
    // updateCartNs(updateObj);


    //Action: add one product to Cart
    $("#productSelection .btn").on("click", function (e) {

        e.preventDefault();
        $(this).css('pointer-events', 'none');

        let productVariantId = $(this).data("productvariantid");

        var sel = "#" + productVariantId + " .ns-select-quantity";
        var currentNums = $("body").find($(sel)).val();
        console.log(currentNums);
        if (!currentNums || currentNums < 10) {
            addToCartNs(productVariantId, 1);
            putCartToTableNs();
        }
        setTimeout(function (el) {
            el.css('pointer-events', 'visible');
        }, 500, $(this));

    });

    $("body").on("change", ".ns-select-quantity", function () {
        console.log($(this).val());
        var quantity = $(this).val()
        var productVariantId = $(this).parent().attr("id");
        var updateObj = {};
        updateObj[productVariantId] = quantity;
        console.log(updateObj);
        updateCartNs(updateObj);//console.log(this.value);
    });


    //Redirect to Cart
    function cartRedirectNs() {
        location.href = "/cart"
    }


    //AJAX Cart to Table
    function putCartToTableNs() {
        $.getJSON('/cart.js', function (cart) {
            var product_rows = cart.items;
            var row = '';
            $('.reviewTableBody').html(row);
            var price = 0;
            var order_total = 0;

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
                row = "<tr><td id='product_name'>" + title + "</td><td id='" + product_id + "' class='" + product_id + " product'><select class='ns-select-quantity'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select>" + "<span style='display:none'>" + quantity + "</span>" + "</td><td>" + total_price.toFixed(2) + "</td></tr>";//<td></td>


                $('.reviewTableBody').append(row);
                var sel = "#" + product_id + " .ns-select-quantity";
                $("body").find($(sel)).val(quantity);

            }

            $('.ordertotal').text(order_total.toFixed(2));

        });

    }

    //Clear cart
    function clearCartNs() {
        $.ajax({
            url: "/cart/clear.js",
            type: "POST",
            async: false
        });
    }




    function snapshotCartNs() {
        $.ajax({
            url: "/cart.js",
            method: "GET",
            dataType: 'json',
            async: false,
            success: function (cart) {
                console.log(cart);
                var snapshotCartObjScooper = {};
                var snapshotCartObjNeaterFeeder = {};
                for (var i = 0; i < cart.items.length; i++) {
                    var itemsProductType = cart.items[i].product_type;
                    var id = cart.items[i].id;
                    var quantity = cart.items[i].quantity;
                    //console.log(cart.items[i]);
                    switch (itemsProductType) {
                        case 'scooper':
                            snapshotCartObjScooper[id] = quantity;
                            break;

                        case 'neaterfeeder':
                            snapshotCartObjNeaterFeeder[id] = quantity;
                            break;
                    }
                    ;
                }
                console.log(snapshotCartObjScooper);
                console.log(snapshotCartObjNeaterFeeder);

                var sumScooper = 0;
                for (key in snapshotCartObjScooper) {
                    sumScooper += snapshotCartObjScooper[key];
                }
                //console.log(sumScooper);

                if (sumScooper > 0) {
                    $.ajax({
                        dataType: "json",
                        url: "/products/free-waste-bags-4-boxes-60-bags.js",
                        async: false,
                        success: function (data) {
                            var variantIdUpsell = data.variants[0].id;
                            addToCartNs(variantIdUpsell, sumScooper);
                            cartRedirectNs();
                        }
                    });
                }
            }
        });
    }


    //Action: add/delete neaterfeeder product to/from Cart
    $("#cbxSelectProduct").on("change", function (e) {
        var isChecked = $(this).prop("checked");
        var productVariantId = $(this).data("productvariantid");
        var updateObj = {};
        if (isChecked) {
            updateObj[productVariantId] = 1;
        }
        else {
            updateObj[productVariantId] = 0;
        }
        updateCartNs(updateObj);

    });




    //Action: reject upsell offer

    $("#rejectOffer").on("click", function (e) {
        e.preventDefault();
        snapshotCartNs();

    });


    // //Action: accept upsell offer
    //
    // $("#acceptOffer").on("click", function (e) {
    //     e.preventDefault();
    //     var upsellSum = $("#upsell-select option:selected").text();
    //     //console.log(upsellSum);
    //     $.ajax({
    //         dataType: "json",
    //         url: "/products/scented-waste-bags-6-boxes-90-bags.js",
    //         async: false,
    //         success: function (data) {
    //             var variantIdUpsell = data.variants[0].id;
    //             addToCartNs(variantIdUpsell, upsellSum);
    //             snapshotCartNs();
    //         }
    //     });
    // });


    $("h1 .logo__image").on("click", function () {
        clearCartNs();
    });

    //end script for neaterscooper


    var heightCatDescrption = 'Add leg extensions to increase the bowl height for a custom fit feeding position for your pet. They are just $5.99 with free shipping. Order now and SAVE BIG on shipping! Raises feeding height (at rim of bowl) from 3" to 4.5"';
    var heightSmallDogDescrption = 'Add leg extensions to increase the bowl height for a custom fit feeding position for your pet. They are just $5.99 with free shipping. Order now and SAVE BIG on shipping! Raises feeding height (at rim of bowl) from 3" to 4.5"';
    var heightMedDogDescrption = 'Add leg extensions to increase the bowl height for a custom fit feeding position for your pet. They are just $7.99 with free shipping. Order now and SAVE BIG on shipping! Raises feeding height (at rim of bowl) from 5" to 7.5"';
    var heightLargeDogDescrption = 'Add leg extensions to increase the bowl height for a custom fit feeding position for your pet. They are just $9.99 with free shipping. Order now and SAVE BIG on shipping! Raises feeding height (at rim of bowl) from 8" to 11"';

    var snapshotCartObj = {};

    var set = "<ul style='float: left; width: 50%' class='pet' id='line'><li><div class='color cranberry'></div><label style='display: inline-block;'><select class='cranberry-pet'><option>0</option><option>1</option><option>2</option><option>3</option></select></label><span class='name_choose'>Cranberry</span></li><li><div class='color bronze'></div><label style='display: inline-block;'><select class='bronze-pet'><option>0</option><option>1</option><option>2</option><option>3</option></select></label><span class='name_choose'>Bronze</span></li><li><div class='color cap'></div><label style='display: inline-block;'><select class='cappuchino-pet'><option>0</option><option>1</option><option>2</option><option>3</option></select></label><span class='name_choose'>Cappuchino</span></li></ul>";
    //var upsell = "<ul style='float: left; width: 50%' class='upsell' id='change'><li><b></b></li><li><label style='display: inline-block;'><select id='upsell'><option  class='upsell_yes'>Yes</option><option>No</option></select></label></ul>";
    //var upsell = "<ul style='float: left; width: 50%' class='upsell' id='change'><li><b></b></li><li><label style='display: inline-block;'><div id='upsell'><input type='radio' checked class='upsell_yes' name='upsellchoice' value='1'>Yes<br/><input value='0' name='upsellchoice' type='radio'>No<br/></div></label></ul>";


    //VERSION 2.0
    var count = 0;

    //Handler on change simple pet choice
    $('input[type=radio][name=ActionCode0]').change(function () {
        clearCart();
        let simpleProdId = $(this).attr("id");
        let quantityProd = $("#ActionQuantity0").val();
        addToCart(simpleProdId, quantityProd);
        putCartToTable();
    });


    //Handler on change simple pet quantity
    $('#ActionQuantity0').change(function () {
        let prodQuantity = $(this).val();
        updateCart(prodQuantity);
        putCartToTable();
    });


    //Handler of first popup
    $('#upgrade').on("click", function (e) {
        $('.warning').hide();
// 		   if(!$.isEmptyObject(snapshotCartObj)){
//     		console.log("OBJECT APPEARS");
//            }
//     else{console.log("OBJECT is EMPTY");}
        let arrSets = $('.sets').find('ul');

        let flagItems = 0;

        for (let i = 0; i < arrSets.length; i++) {
            let idProduct = arrSets[i].id;
            let choosenCranberryItems = $('.sets').find('#' + idProduct + ' .cranberry-pet').val()
            let choosenBronzeItems = $('.sets').find('#' + idProduct + ' .bronze-pet').val()
            let choosenCappuchinoItems = $('.sets').find('#' + idProduct + ' .cappuchino-pet').val()
            let totalChoosenItems = Number(choosenCranberryItems) + Number(choosenBronzeItems) + Number(choosenCappuchinoItems)
            let sum_simple_item = $("#form").find('.' + idProduct).text();
            if (totalChoosenItems != sum_simple_item) {
                flagItems++;
                $('.sets').find('#' + idProduct).append("<li class='warning' style='color:red'><h4>The following errors have occured</h4><p>Please make sure your color quantities match total of items ordered (" + sum_simple_item + ")</p></li>")
            }
        }


        if (flagItems == 0) {
            $.arcticmodal('close');
            $('#exampleModalContinue2').arcticmodal({
                closeOnEsc: false,
                closeOnOverlayClick: false
            });
            //$('#exampleModalContinue .box-modal_close').trigger('click');
            //console.log('second popup 3');
            //return false;
            $.getJSON('cart.js', function (cart) {
                var product_rows = cart.items;
                var product = product_rows[0];
                var arr = [];
                var object_update = {};
                var cart_item_count = cart.item_count;
                for (var i = 0; i < product_rows.length; i++) {
                    var current_product = product_rows[i];
                    //console.log(current_product);
                    var current_simple_product_id = current_product.id;
                    var flagUpgradeThis = 0;
                    var cranberrySelItems = $('.sets').find('#' + current_simple_product_id + ' .cranberry-pet').val();
                    var bronzeSelItems = $('.sets').find('#' + current_simple_product_id + ' .bronze-pet').val();
                    var cappuchinoSelItems = $('.sets').find('#' + current_simple_product_id + ' .cappuchino-pet').val();
                    flagUpgradeThis = Number(cranberrySelItems) + Number(bronzeSelItems) + Number(cappuchinoSelItems);
                    if (flagUpgradeThis != 0) {
                        var current_product_type = current_product.product_type;
                        var current_handle = 'deluxe-' + current_product_type;
                        var current_url_deluxe = '/products/' + current_handle + '.js';
                        //object_update[current_simple_product_id]=0;
                        $.ajax({
                            dataType: "json",
                            url: current_url_deluxe,
                            data: current_simple_product_id,
                            async: false,
                            success: function (product) {
                                var variants = {};

                                for (var j = 0; j < product.variants.length; j++) {
                                    variants[product.variants[j].title] = product.variants[j].id
                                }

                                var cranberry_id = variants.cranberry;
                                var bronze_id = variants.bronze;
                                var cappuchino_id = variants.cappuchino;

                                var jq_selector_cranberry = "#" + current_simple_product_id + " .cranberry-pet";

//                               console.log(current_simple_product_id);
//                               console.log(jq_selector_cranberry);

                                var sets = $('.sets');
                                var cranberry = sets.find(jq_selector_cranberry).val();
                                var jq_selector_bronze = "#" + current_simple_product_id + " .bronze-pet";
                                var bronze = sets.find(jq_selector_bronze).val();
                                var jq_selector_cappuchino = "#" + current_simple_product_id + " .cappuchino-pet";
                                var cappuchino = sets.find(jq_selector_cappuchino).val();
                                object_update[cranberry_id] = cranberry;
                                object_update[bronze_id] = bronze;
                                object_update[cappuchino_id] = cappuchino;
                                object_update[current_simple_product_id] = 0;
                                //console.log(object_update);
                            }
                        });
                    }
                    else {
                        continue;
                    }
                }

                //Object for upgrade
                var data = {
                    updates: object_update
                };
                //console.log(data);
                //AJAX upgade simple product to deluxe
                $.ajax({
                    url: '/cart/update.js',
                    type: "POST",
                    data: data,
                    dataType: 'json',
                    async: false,
                    success: function (cart) {
                        //console.log(cart);
                        putCartToTable();
                        //Add deluxe height select
                        $.getJSON('cart.js', function (cart) {
                            $('.upsells').find('upsell').remove();
                            var product_rows = cart.items;
                            //console.log(cart);
                            var arr = [];
                            var deluxe_cat_quantity = 0;
                            var deluxe_small_dog_quantity = 0;
                            var deluxe_med_dog_quantity = 0;
                            var deluxe_large_dog_quantity = 0;
// //                                                   	for(var i=0; i<product_rows.length; i++){
// //                                                          var current_product = product_rows[i];
// //                                                          var current_product_title = current_product.product_title;
// //                                                          var current_product_type = current_product.product_type;
// //                                                          var current_product_quantity= current_product.quantity;


// //                                                          switch(current_product_type ){
// //                                                            case 'deluxe_cat':
// //                                                              deluxe_cat_quantity += current_product.quantity;
// //                                                              break;
// //                                                            case 'deluxe_small_dog':
// //                                                              deluxe_small_dog_quantity += current_product.quantity;
// //                                                              break;
// //                                                            case 'deluxe_med_dog':
// //                                                              deluxe_med_dog_quantity += current_product.quantity;
// //                                                              break;
// //                                                            case 'deluxe_large_dog':
// //                                                              deluxe_large_dog_quantity += current_product.quantity;
// //                                                              break;

// //                                                          }

// //                                                             if(current_product_type == "deluxe_cat" ||
// //                                                               current_product_type == "deluxe_small_dog" ||
// //                                                               current_product_type == "deluxe_med_dog" ||
// //                                                               current_product_type == "deluxe_large_dog"){
// //                                                                 var product_type_id = $('.upsells').find('#' + current_product_type).length;
// //                                                                 if(!product_type_id){

// //                                                                   $('.upsells').append(upsell);
// //                                                                   $('.upsells').find('#change').attr('id', current_product_type);


// //                                                                   $('.upsells').find("input[name='upsellchoice']").each(function(){
// //                                                                   		$(this).attr('name', current_product_type);
// //                                                                   })


// //                                                                   $('#'+current_product_type + " b").text(current_product_title);

// //                                                                 }
// //                                                            }


                            //}

// // //                                                   			console.log("Cat" + deluxe_cat_quantity);
// // //                                                   			console.log("MED" + deluxe_med_dog_quantity);
// // //                                                   			console.log("Small" + deluxe_small_dog_quantity);
// // //                                                   			console.log("LARGE" + deluxe_large_dog_quantity);
// //                                                   		  $("#deluxe_cat .upsell_yes").attr('value', deluxe_cat_quantity);
// //                                                           $("#deluxe_small_dog .upsell_yes").attr('value', deluxe_small_dog_quantity);
// //                                                           $("#deluxe_med_dog .upsell_yes").attr('value', deluxe_med_dog_quantity);
// //                                                           $("#deluxe_large_dog .upsell_yes").attr('value', deluxe_large_dog_quantity);


                        });

                    }
                });


            });
        }
    });


    $('#yes').on("click", function (e) {
        e.preventDefault();
        var cartObj = {updates: {}};

        var simpleProdName = $('body').find(".pet li:first-child").text().toLowerCase();
        var heightObj = {
            "cat": 'cat-more-height',
            "small": 'small-dog-more-height',
            "med": 'med-dog-more-height',
            "large": 'large-dog-more-height'
        };

        function findHeightHandle(simpleProdName, heightObj) {
            for (key in heightObj) {
                if (simpleProdName.indexOf(key) > -1) {
                    return heightObj[key];
                }

            }
        }

        var handleHeight = findHeightHandle(simpleProdName, heightObj);

        $.getJSON('/products/' + handleHeight).then(function (obj) {
            var idHeight = obj.product.variants[0].id;
            //console.log(obj);
            var cranberryHeight = Number($("body").find('.cranberry-pet').val());
            var bronzeHeight = Number($("body").find('.bronze-pet').val());
            var cappuchinoHeight = Number($("body").find('.cappuchino-pet').val());
            var quantityHeight = cranberryHeight + bronzeHeight + cappuchinoHeight;
            cartObj.updates[idHeight] = quantityHeight;
            //console.log(cartObj);
            updateCart(cartObj);
        });


        function updateCart(data) {
            $.ajax({
                url: '/cart/update.js',
                type: "POST",
                data: data,
                dataType: 'json',
                async: false,
                success: function () {
                    putCartToTable();
                    count++;
                    if (count > 1) {
                        $('#modalthree').arcticmodal({
                            closeOnEsc: false,
                            closeOnOverlayClick: false,
                            beforeOpen: function (data, el) {
                                location.href = "/cart";
                            }
                        }).hide();
                    }
                    else {
                        $.arcticmodal('close');
                        $('#modalthree').arcticmodal({
                            closeOnEsc: false,
                            closeOnOverlayClick: false
                        });
                    }
                }
            });
        }


    });


    function addToCart(prodId, prodQuantity) {

        let url = '/cart/add.js';
        let data = {
            quantity: prodQuantity,
            id: prodId

        };

        $.ajax({
            url: url,
            data: data,
            method: "POST",
            dataType: 'json',
            async: false
        });
    }





    function updateCart(prodQuantity) {
        let prodId = $("body").find('.product').attr("id");
        let url = '/cart/change.js';
        var data = {
            quantity: prodQuantity,
            id: prodId
        };
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            success: function () {
                putCartToTable();
            }
        });
    }


//   $('.choice').on("click", function(e){

// 		//GET PRODUCT
//     var handle = $(this).attr("id");
//     var action = '/products/' + handle + '.js';
//     $.getJSON( action, function(product) {
//       alert('The title of this product is ' + product.title);
//     } );
//   });


    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function putCartToTable() {
        $.getJSON('https://neaterbags.myshopify.com/cart.js', function (cart) {
            var product_rows = cart.items;
            var row = '';
            var price = 0;
            var order_total = 0;

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
                row += "<tr><td id='product_name'>" + title + "</td><td id='" + product_id + "' class='" + product_id + " product'>" + quantity + "</td><td>" + total_price.toFixed(2) + "</td></tr>";//<td></td>
            }
            $('.reviewTableBody').html(row);
            $('.ordertotal').text(order_total.toFixed(2));

        });

    }


    if (getCookie("cart")) {
        putCartToTable();
    }


    //DELETE PRODUCT BY variant ID

    $('.reviewTableBody').on("click", ".del", function (e) {
        e.preventDefault();
        var id_to_delete = $(this).attr('id');


        var arg_to_delete = "ul[id='" + id_to_delete + "']";
        $(".sets").find(arg_to_delete).remove();


        var url = '/cart/change.js';
        var data = {
            quantity: 0,
            id: id_to_delete
        };
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            success: function () {
                putCartToTable();
            }
        });
    });


    //Second popup

    $(".o_button_close_popup_2").on("click", function (e) {

        var cartObj = {updates: {}}
        handler(function () {
            setTimeout(function () {
                updateCart(cartObj)
                cartRedirect()
            }, 800)

        });


        function handler(callback) {
            var valuesList = {
                'cat-more-height': 0,
                'small-dog-more-height': 0,
                'med-dog-more-height': 0,
                'large-dog-more-height': 0
            }

            //console.log(valuesList)
            for (key in valuesList) {
                if (valuesList[key] > 0) {
                    buildCartSingleObjLine(getUrlByKey(key), valuesList[key])
                }
            }
            callback()
        }


        function cartRedirect() {
            location.href = "/cart"
        }


        function getUrlByKey(key) {
            return '/products/' + key + '.js';
        }


        function buildCartSingleObjLine(url, quantity) {
            $.getJSON(url).then(function (product) {
                let prd = product.variants[0].id
                cartObj.updates[prd] = quantity
            });
        }

        function updateCart(data) {
            $.ajax({
                url: '/cart/update.js',
                type: "POST",
                data: data,
                dataType: 'json',
                async: false,
                success: function () {
                    putCartToTable();
                }
            });
        }


    });


    //No upgrade - no more height

    var count_no_upgrade = 0;
    $('.no_button_close_popup').on("click", function (e) {
        e.preventDefault();
        count_no_upgrade++;
        console.log(count_no_upgrade);
        if (count_no_upgrade > 1) {
            $('#modalthree').arcticmodal({
                closeOnEsc: false,
                closeOnOverlayClick: false,
                beforeOpen: function (data, el) {
                    location.href = "/cart";
                }
            }).hide();
        }
        else {
            $('#modalthree').arcticmodal({
                closeOnEsc: false,
                closeOnOverlayClick: false
            });
        }
    });


    $('.no_button_close_popup_2').on("click", function (e) {
        e.preventDefault();
        count++;
        //console.log(count);
        if (count > 1) {
            $('#modalthree').arcticmodal({
                closeOnEsc: false,
                closeOnOverlayClick: false,
                beforeOpen: function (data, el) {
                    location.href = "/cart";
                }
            }).hide();
        }
        else {
            $('#modalthree').arcticmodal({
                closeOnEsc: false,
                closeOnOverlayClick: false
            });
        }

    });


//   $('#rejectOffer').on("click", function(){
//   	cartRedirect();
//   });


});
