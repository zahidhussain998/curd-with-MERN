/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BiShow, BiUserCircle } from "react-icons/bi";
import BookModal from "./BookModle";
import { useState } from "react";

function BookSingleCar({book}) {
    const [showModal, setShowModal] = useState(false)
  return (
    <div
         className="border-2 border-gray-500 rounded-lg px-4 py-2 mr-4 relative hover:shadow-xl "
        >
          <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
            {book.publishYear}
          </h2>
          <h4 className="my-2 text-gray-500">{book._id}</h4>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <h3 className="my-1">{book.title}</h3>
          </div>
          <div className="flex justify-start items-center gap-x-6">
             <BiUserCircle className="text-2xl text-green-800"/>
            <h3 className="my-1">{book.author}</h3>
            </div>
            
            <div>

            <BiShow 
            onClick={() => setShowModal(true)}
            className="text-2xl text-green-800 cursor-pointer"/>
            
            </div>
            <div className="flex justify-start items-center gap-x-2 mt-4 p-4">
            <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className="text-blue-500 text-2xl" />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className="text-green-500 text-2xl" />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className="text-red-500 text-2xl" />
            </Link>
          </div>
            {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
        </div>
  )
}

export default BookSingleCar