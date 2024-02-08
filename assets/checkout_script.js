GeolizrAPI.addEventListener('geolizr.geoData', function(geoData) {
  var country = geoData.countryCode;
  if ( "US" === country || "CA" === country || "PR" === country || country === "MX" ){
    $('.rebuy-checkout-part').css('display', 'block');
    $('.checkout-gift-wrap').show();
  } else {
    $('.rebuy-checkout-part').css('display', 'none');
    $('.checkout-gift-wrap').remove();
  }
});


// Add Gift Message Box In Checkout!

$(function() {
  
  $('#cart-notes-gift-message').on('change', function(){
    if ($(this).prop('checked')) {
      $('.cart-notes-form').show();
    } else {
      $('.cart-notes-form').hide();
    }
  });

  /*
  * Global variable
  */

  let savedGiftNoteMessage = $('[data-cart-notes-textarea]').val().length > 0 ? $('[data-cart-notes-textarea]').val() : '';
  let loadedOnce = false;

  /**
   * Click event listener that adds cart attributes
   * @param {String} note - Gift message 
   */
  function updateGiftNotes(note) {
    $.ajax({
      url: '/cart/update.js',
      method: 'POST',
      data: {note: note},
      dataType: 'json',
      success: function(result) {
        // page refresh needed after POST request or note update won't persist in /cart/update.js
        console.log(result);
        return result;
      },
      error: function(data) {
          console.log(data);
      }
    }); 
  }

  /**
   * Initializing gift message textbox html
   * @param {String} note - Gift message 
   */
  function renderGiftNoteHtml(note) {
      const activeSavedClass = note.length > 0 ?  'active saved new' : '';
      const giftNoteElementBlock = '<div class="checkout-gift-wrap" data-gift-note-html>' +
              '<h2 class="section__title">Gift options</h2>' + 
              '<div class="cart-notes '+ activeSavedClass + '" data-cart-notes>' +
                '<div class="cart-notes-interaction">' +
                  '<div class="cart-notes-checkbox-container">' + 
                    '<input type="checkbox" id="cart-notes-gift-message" class="cart-notes-checkbox"  data-cart-notes-checkbox>' +
                    '<button class="cart-notes-checkbox-display" data-cart-notes-checkbox-display></button>' +
                    '<label class="cart-notes-label" for="cart-notes-gift-message"><span>Add a Gift Message</span></label>' +
                  '</div>' +
                  '<button class="cart-notes-edit-message" data-edit-message>(<span>Edit Message</span>)</button>' +
                '</div>' +
                '<div class="cart-notes-form">' +
                  '<textarea class="cart-notes-textarea" placeholder="Enter gift note here." value="'+ note +'" name="checkout[note]" data-cart-notes-textarea maxlength="250">'+ note +'</textarea>' +
                  '<button class="cart-notes-submit" data-cart-notes-submit>Add Gift Message</button>' +
                  '<span class="cart-notes-textarea-counter" gift-note-character-counter> 0 / 250 remaining</span>' +
                '</div>' +
              '</div>' +
            '</div>';

      return giftNoteElementBlock;
  }

  


  if (Shopify.Checkout.step == 'contact_information') {
    initiateGiftOption();
  }

  function initiateGiftOption() {

    var addGiftNote = function() {
      $('[data-gift-note-html]').appendTo($('.step__sections'));
    }

    addGiftNote();

    var toggleCartNote = function (element) {
      if ($(element).prop('checked')) {
        $(element).closest('[data-cart-notes]').addClass('active');
        
        $(element).closest('[data-cart-notes]').find('[data-cart-notes-textarea]').val('Gift Message: ');
        
        $(element).closest('[data-cart-notes]').find('[data-cart-notes-textarea]').prop('disabled', false);
      } else {
        $.post(window.location.origin + '/cart/update.js', {note: ''}, function() {
          $(element).closest('[data-cart-notes]').removeClass('active saved');
          $('[data-cart-notes-textarea]').val('');
        }, 'json');
      }
      $('[cart-note-character-count]').text(0);
    };

    var editCartNote = function (element) {
      $(element).closest('[data-cart-notes]').removeClass('saved');
      $(element).closest('[data-cart-notes]').find('[data-cart-notes-textarea]').removeClass('disabled');

      // var characterLength = $('[cart-note-message]').val().length;
      // $('[cart-note-character-count]').text(characterLength);
    };

    var saveCartNote = function (element) {

      $('[data-cart-notes]').addClass('saved');
      $(element).closest('[data-cart-notes]').find('[data-cart-notes-textarea]').addClass('disabled');

    };

    /*
    * updating character count
    * @param {Number} characterLength - Character length (including spaces)
    * @param {String} maxLength - max character length allowed
    */
    var updateCharacterCounter = function(characterLength, maxLength) {
      $('[gift-note-character-counter]').text(characterLength + ' / ' + maxLength + ' remaining');
    }

    /*
    * Reset character count when Gift options collapses
    * 
    */
    var resetCharacterCounter = function() {
      var maxLength = $('[data-cart-notes-textarea]').attr('maxlength');
      $('[gift-note-character-counter]').text('0 / ' + maxLength + ' remaining');
    }


    
    $('body').on('keyup keydown', '[cart-note-message]', function (event) {
      if (event.keyCode === 13) {
        return false;
      }
      var input = $(this).val();
      var characterLength = $(this).val().length;
      $('[cart-note-character-count]').text(characterLength);
      $('[cart-note-message]').val(input);
    });

    $('body').on('change', '[data-cart-notes-checkbox]', function () {
      toggleCartNote(this);
    });

    $('body').on('click', '[data-cart-notes-checkbox-display]', function (event) {
      event.preventDefault();
      var cartNoteCheckbox = $(this).siblings('[data-cart-notes-checkbox]');
      var giftMessageTextBox = $('[data-cart-notes-textarea]');

      cartNoteCheckbox.trigger('click');
      giftMessageTextBox.removeClass('disabled');

      if (!cartNoteCheckbox.prop('checked')) {
        resetCharacterCounter();
      }
    });

    $('body').on('click', '[data-edit-message]', function (event) {
      event.preventDefault();
      var giftMessageTextBox = $('[data-cart-notes-textarea]');
      var maxCharacterLength = giftMessageTextBox.attr('maxlength');
      
      updateCharacterCounter(giftMessageTextBox.val().length, maxCharacterLength);
      editCartNote(this);
    });

    $('body').on('click', '[data-cart-notes-submit]', function (event) {
      var giftNoteMassage = $('[data-cart-notes-textarea]').val();
      savedGiftNoteMessage = giftNoteMassage;
      event.preventDefault();
      
      saveCartNote(this);

      if (giftNoteMassage.length > 0) {
        updateGiftNotes(giftNoteMassage);
      }   
    });
    

    $('body').on('keyup', '[data-cart-notes-textarea]', function (event) {
      var textBox = $(event.currentTarget);
      var maxCharacterLength = textBox.attr('maxlength');

      updateCharacterCounter(textBox.val().length, maxCharacterLength);
    });

    


    $(document).on('page:load page:change', function() {

      /**
      * re-inject giftbox textbox after page:load/change
      **/

        if (Shopify.Checkout.step == 'contact_information' && !loadedOnce) {
          const giftNoteHtml = renderGiftNoteHtml(savedGiftNoteMessage);
          $('[data-shipping-address]').after(giftNoteHtml);

          const giftNoteCheckBox =  $('[data-cart-notes-checkbox]');
          const textBox = $('[data-cart-notes-textarea]');
          console.log(savedGiftNoteMessage);

          if (savedGiftNoteMessage.length > 0) {
//             giftNoteCheckBox.trigger('click');
            giftNoteCheckBox.prop( "checked", true );
          }

          loadedOnce = true;
        }
      
    });
  }
  
  if (Shopify.Checkout.step == 'shipping_method') {
    $('.checkout-gift-wrap').css('display', 'none');
  }
  if (Shopify.Checkout.step == 'payment_method') {
    $('.checkout-gift-wrap').css('display', 'none');
  }
  if ($('html').hasClass('page--thank-you')) {
    $('.checkout-gift-wrap').css('display', 'none');
  }
  
});
