//$(document).ready(
//    function(){
//        $('#button').click(
//            function(){
//                var toAdd = $('input[name=ListItem]').val();
//                 $('ol').append('<li>' + toAdd + '</li>');
//            });
//       
//       $("input[name=ListItem]").keyup(function(event){
//          if(event.keyCode == 13){
//            $("#button").click();
//          }         
//      });
//      
//      $(document).on('dblclick','li', function(){
//        $(this).toggleClass('strike').fadeOut('slow');    
//      });
//      
//      $('input').focus(function() {
//        $(this).val('');
//      });
//    
//      $('ol').sortable();  
//      
//    }
//);


var getFreshData = function(){
    $.get('/todo', function(dataFromServer){
        console.log(dataFromServer)
        mainVm.todos = dataFromServer
    })
}

var mainVm = new Vue({
    el: '#app',
    data : {
        todoText : '',
        todos    : [],
    },
    methods : {
        createTodo : function(event){
            event.preventDefault()
            //use `this` to access any data/method
            //ALWAYS send object with AJAX
            console.log(this.todoText)

            $.ajax({
                url: '/todo',
                type: 'POST',
                data: JSON.stringify({todoText: this.todoText}),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(dataFromServer) {
                    console.log(dataFromServer)
                    if ( dataFromServer.success ) {
                        // only clear form if  submission was successful
                        mainVm.todoText = ''
                        getFreshData()
                    }
                }
            });
        },
        markDone: function(todo){
            console.log(todo)

            $.ajax({
                url: '/todo/done',
                type: 'POST',
                data: JSON.stringify(todo),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(dataFromServer) {
                    console.log(dataFromServer)
                    if ( dataFromServer.success ) {
                        // only clear the form after we know the submission was successful
                        getFreshData()
                    }
                }
            });
        },
        deleteTodo: function(todo, event){
            // $.delete() // this function does not exist in jQuery
            event.stopPropagation()
            $.ajax({
                url: `/todo/${todo._id}`,
                type: 'DELETE',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(dataFromServer) {
                    console.log(dataFromServer)
                    if ( dataFromServer.success ) {
                        //only clears form if submission was successful
                        getFreshData()
                    }
                }
            });
        }
    },
    created : function(){
        getFreshData()
    }
})