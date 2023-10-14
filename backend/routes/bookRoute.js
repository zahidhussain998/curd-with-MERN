import express from 'express';
import { Book } from '../model/bookModel.js';
import multer from "multer"; // Import the multer library


const router = express.Router();


// Create a storage engine for multer
const storage = multer.diskStorage({
    destination: 'uploads/', // Define the destination folder for file uploads
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname); // Define how the uploaded file should be named
    },
  });

  const upload = multer({ storage: storage }); // Initialize multer with the defined storage engine


//Route for save  a new Book

// Route for saving a new Book with an image
router.post('/', upload.single('bookImage'), async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
        imageUrl: req.file.path, // Store the file path in the imageUrl field
      };
  
      const book = await Book.create(newBook);
      return res.status(200).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //Route for Get All BOOKS from database
  router.get('/', async (req, res)=>{
      try{
          const books = await Book.find({});
          return res.status(200).json({
              count:books.length,
              data: books
          })
      }
      catch(error){
          console.log(error.message);
          res.status(500).send({message: error.message});
      }
  })
  
  
  //Route for Get a single book from database
  router.get('/:id', async (req, res)=>{
      try{
          const book = await Book.findById(req.params.id);
          if(book){
              return res.status(200).json(book)
          }
          return res.status(404).send({message: 'Book not found'})
      }
      catch(error){
          console.log(error.message);
          res.status(500).send({message: error.message});
      }
  }
  )
  
  //Route for Update a single book from database
  router.put('/:id', async (req, res)=>{
      try{
        if(
          !req.body.title ||
          !req.body.author ||
          !req.body.publishYear
  
        ) {
          return res.status(400).send({
              message: 'send all req fields: title, author, publishYear',
          })
        }
        const {id} = req.params;
  
        const result = await Book.findByIdAndUpdate(id, req.body);
  
        if(!result){
              return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book Update successfully'})
      }
      catch(error){
          console.log(error.message);
          res.status(500).send({message: error.message});
      }
  
  })
  // Route for delete a book
  // Route for delete a book
  router.delete('/:id', async (req, res) => {
      try {
        const { id } = req.params;
    
        const result = await Book.findByIdAndDelete(id);
    
        if (!result) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        return res.status(200).send({ message: 'Book deleted successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
      }
    });
    
    
    export default router;
    