GeolizrAPI.addEventListener('geolizr.geoData', function(geoData) {
  var country = geoData.countryCode;
  var iso_code = geoData.currencyCode;
  
//   Preorder for US & Candada & Puerto Rico & Mexico
  if ( "US" === country || "CA" === country || "PR" === country || country === "MX" ){
    
    $('.pre-order-version').show();
    $('.none-pre-order-version').remove();
    $('.pre-remove').show();
    $('.none-pre-remove').remove();
    
  }else{
    
    $('.pre-order-version').remove();
    $('.none-pre-order-version').show();
    $('.pre-remove').remove();
    $('.none-pre-remove').show();
    $('.pre-hide').show();
    
	// url handle
    if(window.location.href == 'https://almondcow.co/products/almond-cow-glass-jug'
       || window.location.href == 'https://almondcow.co/products/almond-cow-glass-jug-6-pack'
       || window.location.href == 'https://almondcow.co/products/starter-set'
       || window.location.href == 'https://almondcow.co/products/ingredient-bundle'
       || window.location.href == 'https://almondcow.co/products/jug-brush'
       || window.location.href == 'https://almondcow.co/products/glass-jug-jug-brush'
       || window.location.href == 'https://almondcow.co/products/almond-cow-bottles'
       || window.location.href == 'https://almondcow.co/products/almond-cow-milk-machine'
      )
    {
      window.location.href="https://almondcow.co/products/almond-cow-milk-machine-220v";
    }
    
  }
  
//   only for US country
  if ( "US" === country ){
    $('.us-only').show();
    $('.none-us-only').remove();
  } else{
    $('.us-only').remove();
    $('.none-us-only').show();
  }
  
//   only for Europe country, Australia / New Zealand / UAE
  if (country === "AT" || country === "BE" || country === "BG" || country === "HR" || country === "CY" || country === "CZ" 
     || country === "DK" || country === "EE" || country === "FI" || country === "FR" || country === "DE" || country === "GR" 
     || country === "HU" || country === "IE" || country === "IT" || country === "LV" || country === "LT" || country === "LU" 
     || country === "MT" || country === "NL" || country === "PO" || country === "PT" || country === "RO" || country === "SK" 
     || country === "SI" || country === "ES" || country === "SE" || country === "AL" || country === "AD" || country === "AM" 
     || country === "BY" || country === "BA" || country === "FO" || country === "GE" || country === "GI" || country === "IS" 
     || country === "IM" || country === "XK" || country === "LI" || country === "MK" || country === "MD" || country === "MC" 
     || country === "ME" || country === "NO" || country === "RU" || country === "SM" || country === "RS" || country === "CH" 
     || country === "TR" || country === "UA" || country === "GB" || country === "VA"){
  
    $('.pre-europe-only').show();
    $('.none-pre-europe-only').remove();
    
  } else {
    $('.pre-europe-only').remove();
    $('.none-pre-europe-only').show();
  }
  
  //   only for Australia / New Zealand / UAE
  if (country === "AU" || country === "NZ" || country === "AE"){
    $('.pre-au-only').show();
    $('.none-pre-au-only').remove();

  } else {
    $('.pre-au-only').remove();
    $('.none-pre-au-only').show();
  }
  
//  define tax for US, CA, GB, AU in Help page/shipping tabs
  if ( "US" === country || "CA" === country || "GB" === country || "AU" === country ){
    $('.tax-country-only').show();
    $('.none-tax-country-only').remove();
  } else{
    $('.tax-country-only').remove();
    $('.none-tax-country-only').show();
  }
    
});
