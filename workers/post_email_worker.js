//create a queue
const queue =require('../config/kue');
//imported commentsMailer
const postsMailer =require('../mailers/posts_mailer');

queue.process('post_emails',function(job,done){
    console.log('emails worker is processing :',job.data);
    //calls the mailer
    postsMailer.newPost(job.data);
    done();
})