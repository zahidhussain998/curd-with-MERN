/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";


// eslint-disable-next-line react/prop-types
const BackButton = ({destination= '/'}) => {
    return (
        <Link
        to={destination}
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
        <BsArrowLeft className="mr-2" /> Back
        </Link>
    );
}

export default BackButton;