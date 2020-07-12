const nodeMailer =require('../config/nodemailer');

//creating a function which will send mails

    //normal way of exporting function
    //newComment = function{
    //content
    //}
    // module.exports =newComment

    //new way

    exports.newComment =(comment)=>{
        //adding template
        let htmlString =nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
        nodeMailer.transporter.sendMail({
            from :'codeial001@gmail.com', //dummy MAIL 
            to : comment.user.email,
            subject :"New Comment",
            html :htmlString  //'<h1>Yup, your comment is now published!</h1>' //
        },(err,info)=>{
            if(err){console.log('error in sending mail',err); return };

            console.log('Message sent',info);
            return;
        });
    }