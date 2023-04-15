const express = require('express');
const app = express();
const pdfUtil = require('pdf-to-text');
const multer = require('multer');

const PORT = 9000;

const storage = multer.diskStorage({
   destination:(req,file,cb) => {
       
      cb(null,'pdfs')
   },
   filename:(req,file,cb) => {
      cb(null,'book.pdf')
   }

})

const upload = multer({storage:storage})


app.get('/',(req,res) => {
   res.send('hi welcome to pdf-to-audio-server');
})

app.post('/post/:page', upload.single('PDF') ,(req,res) => {
     
      const pdf_path = __dirname + '/pdfs/book.pdf'
      const pagenumber =  parseInt(req.params['page']);
      const option = {from: pagenumber, to: pagenumber};

    

          
try{ 
    

      
  pdfUtil.pdfToText(pdf_path, option, function(err, data) {
  
     if (err) {
       res.status(400).send({error:err});
     }
     else res.json({body:data.replace(/(\r\n|\n|\r|\f)/gm,'')});
      
 }); 
      
      
    
    

   }catch(e){

      
      res.status(404).send({error:e.message});
      
      
   }


});




app.listen(PORT,() => {
	console.log('server is listenning on port 9000');
})