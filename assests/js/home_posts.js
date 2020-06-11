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
                let newPost =newPostDOM(data.data.post);
                $('#posts-lists-container > ul').prepend(newPost);
                deletePost($(' .delete-post-button', newPost));
                
                new Noty({
                    theme :'relax',
                    text :"POST PUBLISHED",
                    type :'success',
                    layout :'topRight',
                    timeout :1500
                }).show();

            },error :function(error){
                console.log(error.responseText);
                }
            })
        });
    }

    //method to create a post in DOM
    let newPostDOM =function(post){
        return $(`<li id="post-${post._id}">
        <small>
            <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
        </small>
        ${post.content}
        <small>
        ${post.user.name}
        </small>
        <br>
        <div class="post-comment">
                <form action="/comment/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment..." required>
                    <!--we need to send the post id where we need to add comment-->
                    <input type="hidden" name="post" value="${post._id}">
                    <button type="submit" >Add comment</button>
                </form>
            
        </div>
        <div class="post-comment-list">
            <ul id="post-comment-${post._id}">
            </ul>
        </div>
        <hr>
        <br>
    </li>`)
    }


    // method to delete a post  from DOM
    let deletePost =function(deleteLink){
        $(deleteLink.click(function(event){
            event.preventDefault();

            $.ajax({
                type :'get',
                url :$(deleteLink).prop('href'),
                success :function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();


                },error:function(error){
                    console(error.responseText);
                }
            });
        }));
    }


    createPost();
}