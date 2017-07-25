//Check Off Specidic Todos by Clicking
$('ul').on('click', 'li', () => {
  $(this).toggleClass('completed');
});

//Click on X to delete todo
$('ul').on('click', 'span', function(event) {
  event.stopPropagation();
  $(this).parent().fadeOut(500, () => {
    $(this).remove();
  });
});
//Add new todo
$("input[type='text']").keypress(function(event){
  if (event.which === 13) {
    let todoText = $(this).val();
    if (todoText) {
      $('ul').append(`<li><span><i class="fa fa-trash"></i></span> ${todoText}</li>`);
      $(this).val('');
    }
  }
});

$('.fa-plus').on('click', () => {
  $("input[type='text']").fadeToggle();
});