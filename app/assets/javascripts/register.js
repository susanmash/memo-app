
$(document).ready(function(){
  //Get the modal
  var modal = document.getElementById('myReg');
  var modal2 = document.getElementById('myLogin');

  // When the user clicks on the button, open the modal
  $("button#opts").click(function(){
    modal.style.display = "block";
  });

  $("button#optsL").click(function(){
    modal2.style.display = "block";
  });

  // When the user clicks on <span> (x), close the modal
  $("span.close").click(function(){
    modal.style.display = "none";
  });

  $("span.close2").click(function(){
    modal2.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }

  window.onclick = function(event) {
    if (event.target == modal) {
        modal2.style.display = "none";
    }
  }

  // jQuery client side validations for registration input fields
  $('#fname').keydown(function(input){
    if(input.key.length <= 2){
      $("#f").text("First name is required & must be at least 3 characters.").append().css("color", "red").css("font-size", "14px");
      $(this).css("border", "1px solid red");
    }
    else{
      $("#f").text("");
      $(this).css('border', '1px solid #888');
    }
  });

  $('#lname').keydown(function(input){
    if(input.key.length <= 2){
      $("#l").text("Last name required & must be at least 3 characters.").append().css("color", "red").css("font-size", "14px");
      $(this).css("border", "1px solid red");
    }
    else{
      $("#l").text("");
      $(this).css('border', '1px solid #888');
    }
  });

  function validateEmail($email) {
     var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
     return emailReg.test($email);
  }

  $("#email").focusout(function(){
    validateEmail();
    if( !validateEmail($("#email").val())) {
      $("#e").text("Email is required & must be valid.").append().css("color", "red").css("font-size", "14px");
      $(this).css("border", "1px solid red");
    }
    else{
      $("#e").text("");
      $(this).css('border', '1px solid #888');
    }
  });

  var pwConfirm = function(){
    var check = [/\@+/g, /\#+/g, /\%+/g, /\!+/g, /\*+/g, /\&+/g];
    var test = false;
    $.each(check, function(i){
      if($("#password").val().includes(i)){
        $("#p").text("");
        $(this).css('border', '1px solid #888');
        test = true;
      }
    });
    if(test == false){
      $("#p").text("Password must contain letters, at least one number & special character.").append().css("color", "red").css("font-size", "14px");
      $(this).css("border", "1px solid red");
    }
  };

  $("#password").keydown(function(input){
    pwConfirm();
  });

  var confirm = function(){
    if($("#conf_password").val() !== $("#password").val()){
      $("#cp").text("Make sure confirmation matches password entered.").append().css("color", "red").css("font-size", "14px");
      $(this).css("border", "1px solid red");
    }
    else{
      $("#cp").text("");
      $(this).css('border', '1px solid #888');
    }
  };
  confirm();

  $("#conf_password").keydown(function(input){
    confirm();
  });

  // jQuery function to send form data to register controller create method triggered by form submission
  $('form.register').submit(function(){
    $.ajax({
      url: '/register',
      type: 'POST',
      data: $(this).serialize() && $(this).attr('action')
    })
  });

  // jQuery function to send form data to login controller create method triggered by form submission
  $("#myLogin").submit(function(){
    $.ajax({
      url: '/login',
      type: 'POST',
      data: $(this).serialize() && $(this).attr('action')
    })
  });

});
