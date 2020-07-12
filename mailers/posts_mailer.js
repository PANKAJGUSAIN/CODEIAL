const nodeMailer =require('../config/nodemailer');

//creating a function which will send mails

    //normal way of exporting function
    //newComment = function{
    //content
    //}
    // module.exports =newComment

    //new way

    exports.newPost =(post)=>{
        console.log('inside newComment mailer',post);
        //adding template
        let htmlString =nodeMailer.renderTemplate({post:post},'/posts/new_post.ejs');
        //
        nodeMailer.transporter.sendMail({
            from :'gusainpankaj1999@gmail.com', //dummy MAIL
            to : post.user.email,
            subject :"NEW POST!",
            html :htmlString  //'<h1>Yup, your comment is now published!</h1>'
        },(err,info)=>{
            if(err){console.log('error in sending mail',err); return };

            console.log('Message sent',info);
            return;
        });
    }