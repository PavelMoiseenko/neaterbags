!(function($){
  
	// "use strict";
  
  $(document).ready(function(){
    
    var $cart_procut_cell = $('#CartSection form .cart__row.cart__header-labels .grid--full .grid__item .grid--full');
    
    if($cart_procut_cell.length){
      
      $cart_procut_cell.each(function(i, el){

        var _that = $(this);

        _that.find('.grid__item:first').before('<div class="grid__item grid__item__product grid__item__product_js">Product</div>');

      });
    }
    
    $(".no_button_close_popup").on("click", function(e){
      e.preventDefault();
      $('#exampleModalContinue .box-modal_close').trigger('click');
      $("#exampleModalContinue2").arcticmodal({
              closeOnEsc: false,
              closeOnOverlayClick: false
            });       
        
    });
    
//     $('.no_button_close_popup_2').on("click", function(e){
//       e.preventDefault();
//       $('#exampleModalContinueClick_hereInfo .box-modal_close').trigger('click');
//     });
    
    
//     $(".info_popupContinue").on("click", function(e){
//       e.preventDefault();
//       $.getJSON( 'cart.js', function(cart) {
//         if( cart.item_count > 0 ){
//         	$('#exampleModalContinue').arcticmodal({
//               closeOnEsc: false,
//               closeOnOverlayClick: false
//             });       
        
//         }
//       }); 
      
//     });
    
    
//     $('#upgrade').on('click', function(e){
//       e.preventDefault();
//       console.log('second popup 1');
//       $('#exampleModalContinue2').arcticmodal({
//         closeOnEsc: false,
//     	closeOnOverlayClick: false
//       });
//       console.log('second popup 2');
//       //$('#exampleModalContinue .box-modal_close').trigger('click');
//       console.log('second popup 3');
//       return false;
//     });
    
    /*$(".site-footer__links li").each(function(i, el){
      if($(this).find("> span a").attr("href") == "#"){
      	$(this).addClass('info_popup' + i);
      }
    });
    
    $('.info_popup').click(function(){
    	$('#exampleModal1').arcticmodal();
      return false;
    });
    
    $.arcticmodal({
    type: 'ajax',
    url: 'assets/example.html',
    afterLoading: function(data, el) {
        alert('afterLoading');
    },
    afterLoadingOnShow: function(data, el) {
        alert('afterLoadingOnShow');
    }
});*/
  });
  
})(jQuery);