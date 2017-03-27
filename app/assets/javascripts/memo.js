$(document).ready(function(){

  // keep new memo form hidden until user clicks on 'make memo' form
  var newMemoForm = document.getElementById("newMemo");
  $(newMemoForm).css('display', 'none');
  $("span#minimize").css('display', 'none');
  $(".make_memo").css('display', 'block');
  $(".edit_memo").css('display', 'block');
  $(".all_memos").css('display', 'flex');


  // show new memo form to compose memo; hide 'make memo' & remove all memo's from view
  var newMode = function(){
    $(newMemoForm).show();
    $(newMemoForm).parent('.newMemo').css('height', '588px');
    $(".all_memos").hide().css('height', '0');
    $(".make_memo").hide();

  };

  $('#make_memo').click(function(){
    newMode();
  });

  // if no new memo composed option to cancel & revert view to original state
  var cancelMode = function(){
    $(newMemoForm).hide();
    $(".make_memo").show();
    $(".all_memos").show();
  };

  $("#cancel_memo").click(function(){
    cancelMode();
  });

  // function to show expanded memo form memo selected
  var memoExp = function(id){
    var form = $("form").find(id);
    $.each(form.prevObject, function(idx, val){
      var temp = val.id;
      if(temp == id){
        form = document.getElementById(id);
        $(form).siblings().hide();
        return;
      }
    });
    $("#make_memo").hide();
    $("span#expand").parent('form').addClass('expanded_memo');
    $("span#expand").hide();
    $("span#minimize").show();
  };

  // function to revert expanded view back to original (minimized) memo
  var memoMin = function(){
    $(".edit_memo").nextAll().show();
    $(".edit_memo").prevAll().show();
    $("#make_memo").show();
    $("span#minimize").parent('form').removeClass('expanded_memo');
    $("span#minimize").hide();
    $("span#expand").show();
  };

  $("span#expand").click(function(e){
    e.preventDefault();
    console.log($(this).parent().attr('id'));
    var id = $(this).parent().attr('id');
    memoExp(id);
  });

  $("span#minimize").click(function(e){
    e.preventDefault();
    memoMin();
  });

  // new memo composed and form submitted to DB
  $('#new_memo').submit(function(){
    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        $('#memo').html(data.memo_content).appendTo(".all_memos");
        // $(allMemos).append();
      },
      "json"
    );
    return false;
  });

  // set priority/color coding when user clicks away from color options list after selection is made
  $(".m_priority").change(function(data){
    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        var memo = document.getElementById(data.id);
        $(memo).children('div').html("<p class='p priority_"+data.priority+"'></p>").prepend();
      },
      "json"
    );
    return false;
  });

  // send memo content edits & save revisions in DB once user clicks away from form after new input entered
  $(".edit_memo").focusout(function(data){
    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        console.log(data);
        $('.rev').text(data.content).prepend();
        $('.title').text(data.title).prepend();
      },
      "json"
    );
    return false;
  });

  // sends post request for any changes made to memo in expnaded form
  $(".expanded_memo").focusout(function(data){
    $.post(
      $(this).attr('action'),
      $(this).serialize(),
      function(data){
        console.log(data);
        $('.rev').text(data.content).prepend();
      },
      "json"
    );
    return false;
  });
});
