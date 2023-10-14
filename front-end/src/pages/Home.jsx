import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ShowType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 ">
        <div className="flex justify-center items-center  gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          {" "}
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Books List</h1>
        <Link
          to="/books/create"
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <MdOutlineAddBox className="mr-2" /> Add Book
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : ShowType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}

export default Home;
