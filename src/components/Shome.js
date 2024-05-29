import React,{useRef,useState} from "react"
import { useNavigate } from "react-router-dom"
import Snavbar from "./Snavbar"
import "./Slogin.css"
import "./Shome.css"
export default function Shome(){
  const navigate=useNavigate();
  // const [credentials, setCredentials] = useState({ email: "", password: "" });
  const formRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("http://localhost:5000/api/details/resume", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {


        // console.log(response.statusText);
        // console.log(response.error);
        throw new Error("Failed to add details");
      }

      alert("Details added successfully");
      formRef.current.reset();
    } catch (error) {
      // console.error(error);
      alert("Failed to add details");
    }
  };
//   const handleChange=(e)=>{
//     e.preventDefault();
//     setCredentials({...credentials,[e.target.name]:e.target.value})
// }  
//         const formRef=useRef();
        return (
        <div className="addcomp">
    <Snavbar/>

    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 glass-container">
          <div className="mt-1 nav d-flex justify-content-center">
            <h2>ENTER DETAILS BELOW:</h2>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-2">
                  <label htmlFor="Name" className="form-label">
                    Name:
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    // onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    // onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="contact" className="form-label">
                    Contact:
                  </label>
                  <input
                    name="contact"
                    type="number"
                    className="form-control"
                    // onChange={handleChange}
                  />
                </div>
                <label htmlFor="resume" className="form-label">
                    Resume
                </label>
                <input name="resume" type="file" className="form-control mb-5" id="inputGroupFile02" required accept='.docx, .doc, .pdf'/> 
               </div>
               <div>
                <button type="submit" className="btn btn-dark btn-lg mt-2">Submit</button>
               </div>
            </div>
            <br />
            <br />
            {/* <div className="text-center">
              <button type="submit" className="btn btn-dark btn-lg mt-2">
                Add Company
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
        </div>
    )
}
