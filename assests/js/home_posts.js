{   //method to submit the form data for new post using AJAX
    let createPost =function(){
        let newPostForm =$('#new-post-form');
        newPostForm.submit(function(event){
            event.preventDefault();

        $.ajax({
            type:'POST',
            url :'/post/create',
            data :newPostForm.serialize(),
            success:function(data){
            console.log(data);
            },error :function(error){
                console.log(error.responseText);
                }
            })
        });
    }

    createPost();

    //method to create a post in DOM
}