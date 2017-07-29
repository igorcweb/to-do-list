var $todos = $("#todos"),
     $todo = $("#todo");

function addTodo(todo) {
  $todos.append(`<li><span data-id="mongoId" class="delete">
                 <i class="fa fa-trash" />
      </span> ${todo.todo}</li>`);
}


//Check Off Specidic Todos by Clicking
$('ul').on('click', 'li', function() {
  $(this).toggleClass('completed');
});

//Click on X to delete todo
// $('ul').on('click', 'span', function (event) {
//   event.stopPropagation();
//   $(this).parent().fadeOut(500, function() {
//     $(this).remove();
//   });
// });

$todos.on('click', '.delete', function(event) {
  event.stopPropagation();
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  
  $.ajax({
    type: 'DELETE',
    url: '/api/todos/' + $(this).attr('data-id')
  })
    .done(function() {
      console.log($(this));
      $li.fadeout(300, function() {
        $(this).remove();
      });
    })
    .fail(function(err) {
      console.log(err);
    });
});
//Add new todo
  //Sanitize Input
function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
$("input[type='text']").keypress(function (event) {
  if (event.which === 13) {
    let todoText = htmlEntities($(this).val());
    if (todoText) {
      var todo = {todo: $todo.val()}
      $.ajax({ type: "POST", 
                url: "/api/todos", 
                data: todo 
        }).done(function(newTodo) {
          addTodo(newTodo);
        })
        .fail(function(err) {
          console.error(err);
        });
      $(this).val('');
    }
  }
});
//Plus menu
$('.fa-plus').on('click', () => {
  $("input[type='text']").fadeToggle();
});

$.ajax({
  type: "GET", //default (not required)
  url: "/api/todos"
})
  .done(function(todos) {
    $.each(todos, function(i, todo) {
      addTodo(todo);
    });
  })
  .fail(function(err) {
    console.log(err);
  });

