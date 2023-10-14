/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios  from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from '../components/BackButton'
function ShowBook() {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/books/${id}`)
            .then((res) => {
                setBook(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }
    , [id]);

    
  return (
    <div className="p-4">
        <BackButton/>
        <h1 className="text-3xl my-4">Show Book</h1>

        {loading ? (
            <Spinner/>
        ):(
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                <div className="my-4">
                    <span className="font-bold">Id</span>
                    <span>{book._id}</span>
                </div>
                <div className="my-4">
                    <span className="font-bold">Title</span>
                    <span>{book.title}</span>
                </div>
                <div className="my-4">
                    <span className="font-bold">Author</span>
                    <span>{book.author}</span>
                    </div>

                    <div className="my-4">
                    <span className="font-bold">Author</span>
                    <span>{book.publisherYear}</span>
                    </div>
                    <div className="my-4">
                    <span className="font-bold">Create time</span>
                    <span>{new Date(book.createdAt).toString()}</span>
                    </div>

                    <div className="my-4">
                    <span className="font-bold">Last Update Time</span>
                    <span>{new Date(book.updatedAt).toString()}</span>
                    </div>


          {book.imageUrl && (
            <div className="my-4">
              <span className="font-bold">Image</span>
              <img src={book.imageUrl} alt="Book" />
            </div>
          )}


                    
                   



                </div>
        )}

    </div>

  )
}

export default ShowBook