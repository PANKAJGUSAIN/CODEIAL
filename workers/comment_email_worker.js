//create a queue
const queue =require('../config/kue');
//imported commentsMailer
const commentsMailer =require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
    console.log('emails worker is processing :',job.data);
    //calls the mailer
    commentsMailer.newComment(job.data);
    done();
})