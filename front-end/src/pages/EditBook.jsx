
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from '../components/BackButton';
import { useParams } from "react-router-dom";
import {useSnackbar} from 'notistack';


function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisherYear, setPublisherYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();
  const {id} =useParams();

useEffect(()=>{
    axios.get(`http://localhost:3000/books/${id}`)
    .then((response) => {
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setPublisherYear(response.data.publishYear)
        setLoading(false)
    }).catch((error)=>{
        alert('Something went wrong')
        setLoading(error)
    })
},[])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear: publisherYear, // Corrected field name
    };
    setLoading(true);

    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Edited successfully', {variant:'success'} )

        navigate('/');
      })
      .catch(() => {
        setLoading(false);
        enqueueSnackbar('Error', {variant:'Error'} )

        alert('Something went wrong');
      });
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-3 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-3 border-gray-500 px-4 py-3 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label> {/* Corrected label */}
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-3 border-gray-500 px-4 py-3 w-full"
          />
        </div>
        <div className="my-4">
  <label className="text-xl mr-4 text-gray-500">Publisher Year</label>
  <input
    type="text"
    value={publisherYear}
    onChange={(e) => setPublisherYear(e.target.value)}
    className="border-3 border-gray-500 px-4 py-3 w-full"
  />
</div>

        <div className="my-4">
          <button
            onClick={handleEditBook}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}




export default EditBook