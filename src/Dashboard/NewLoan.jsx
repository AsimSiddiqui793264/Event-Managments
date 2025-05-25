// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import "./Dashboard.css";
// import "./NewLoan.css";
// import { useForm } from "react-hook-form";
// import { supabase } from "../Pages/Authentication";

// export default function NewLoan() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [formValues, setFormValues] = useState({});

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const closeSidebar = () => setSidebarOpen(false);

//   const {
//     register,
//     reset,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({ mode: "all" });

//   const formSubmit = async (data) => {
//     if (data) {
//       console.log(data);
//       Swal.fire({
//         title: "Form Submit",
//         text: "Your form Submit Successfully",
//         icon: "success",

//       });
//     }

//     try {
//       const { error } = await supabase.from("Event").insert({
//         date: data.Dates,
//         title: data.title,
//         description: data.description,
//         Category: data.category,
//         location : data.address,
//       });

// const uploadImage = async (file) => {
//   const fileName = `${Date.now()}-${file.name}`; // unique filename
//   const { data, error } = await supabase.storage
//     .from('event-images') // your bucket name
//     .upload(fileName, file);

//   if (error) {
//     console.error("Upload error:", error.message);
//     return null;
//   }

//   // Generate public URL (for public buckets)
//   const { publicURL } = supabase
//     .storage
//     .from('event-images')
//     .getPublicUrl(fileName);

//   return publicURL;
// };

//       if (error) throw error;
//     } catch (error) {
//       console.log("Event insert error is " + error.message);
//     }finally{
//       reset();
//     }
//   };

//   const saveFormValues = (data) => {
//     setFormValues(data);
//   };

//   return (
//     <>
//       {/* Mobile Navbar */}
//       <div className="d-md-none p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
//         <h5 className="mb-0">Create Event</h5>
//         <button className="btn btn-outline-primary" onClick={toggleSidebar}>
//           &#9776;
//         </button>
//       </div>

//       <form onSubmit={handleSubmit(formSubmit)}>
//         <div className="dashboard-container d-flex">
//           {/* Sidebar */}
//           <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
//             <Sidebar />
//           </div>
//           {sidebarOpen && (
//             <div className="backdrop d-md-none" onClick={closeSidebar}></div>
//           )}

//           {/* Main Content */}
//           <div className="flex-grow-1 p-3">
//             <h3 className="mb-3  text-success">Add new Event</h3>
//             <p>
//               Please complete all required information to submit your request.
//             </p>

//             <div>
//               <h5 className=" text-success">Add Information</h5>
//               <div className="row g-3">
//                 <div className="col-4">
//                   <label>Title</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     {...register("title", {
//                       required: {
//                         value: true,
//                         message: "This field is required",
//                       },
//                     })}
//                     placeholder="Enter title here"
//                   />
//                   {errors.reference && (
//                     <p className="text-danger">{errors.reference.message}</p>
//                   )}
//                 </div>
//                 <div className="col-4">
//                   <label>Description</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     {...register("description", {
//                       required: {
//                         value: true,
//                         message: "This field is required",
//                       },
//                     })}
//                     placeholder="Enter Description here"
//                   />
//                   {errors.loanPackage && (
//                     <p className="text-danger">{errors.loanPackage.message}</p>
//                   )}
//                 </div>
//                 <div className="col-4">
//                   <label>Date</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     {...register("Dates", {
//                       required: {
//                         value: true,
//                         message: "This field is required",
//                       },
//                     })}
//                     placeholder="YYYY"
//                   />
//                   {errors.Dates && (
//                     <p className="text-danger">{errors.Dates.message}</p>
//                   )}
//                 </div>
//                 <div className="col-12 col-md-6">
//                   <label>Gender *</label>
//                   <select {...register("gender")} className="form-select">
//                     <option>Select gender</option>
//                     <option>Male</option>
//                     <option>Female</option>
//                   </select>
//                 </div>
//                 <div className="col-12 col-md-6">
//                   <label>Category</label>
//                   <input
//                     type="text"
//                     {...register("category", {
//                       required: {
//                         value: true,
//                         message: "This field is required",
//                       },
//                     })}
//                     className="form-control"
//                   />
//                   {errors.category && (
//                     <p className="text-danger">
//                       {errors.category.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="col-6">
//                   <label>Location</label>
//                   <input
//                     type="text"
//                     {...register("address")}
//                     className="form-control"
//                   />
//                   {errors.address && (
//                     <p className="text-danger">{errors.address.message}</p>
//                   )}
//                 </div>
//                 <div className="col-6">
//                   <label>Image Upload</label>
//                   <input
//                     type="file"
//                     {...register("image")}
//                     className="form-control"
//                   />
//                   {errors.image && (
//                     <p className="text-danger">{errors.image.message}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="d-flex justify-content-between mt-4">

//             <button className="btn btn-success ms-auto" type="submit">
//               Submit
//             </button>

//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

import { useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import "./NewLoan.css";
import { useForm } from "react-hook-form";
import { supabase } from "../Pages/Authentication";
import Swal from "sweetalert2";

export default function NewLoan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("event-image")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }

    const { publicURL } = supabase.storage
      .from("event-image")
      .getPublicUrl(fileName);

    return publicURL;
  };

  const formSubmit = async (data) => {
    try {
      let imageUrl = null;
      if (data.image && data.image) {
        imageUrl = await uploadImage(data.image);
        console.log(imageUrl);
      }

      const { error } = await supabase.from("Event").insert({
        date: data.Dates,
        title: data.title,
        description: data.description,
        Category: data.category,
        location: data.address,
        image: imageUrl,
      });

      if (error) throw error;

      Swal.fire({
        title: "Form Submit",
        text: "Your form submitted successfully",
        icon: "success",
      });
      reset();
    } catch (error) {
      console.log("Event insert error is " + error.message);
    }
  };

  return (
    <>
      <div className="d-md-none p-2 bg-light border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Create Event</h5>
        <button className="btn btn-outline-primary" onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="dashboard-container d-flex">
          <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
            <Sidebar />
          </div>
          {sidebarOpen && (
            <div className="backdrop d-md-none" onClick={closeSidebar}></div>
          )}

          <div className="flex-grow-1 p-3">
            <h3 className="mb-3 text-success">Add new Event</h3>
            <p>
              Please complete all required information to submit your request.
            </p>

            <div>
              <h5 className="text-success">Add Information</h5>
              <div className="row g-3">
                <div className="col-4">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("title", {
                      required: "This field is required",
                    })}
                    placeholder="Enter title here"
                  />
                  {errors.title && (
                    <p className="text-danger">{errors.title.message}</p>
                  )}
                </div>

                <div className="col-4">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("description", {
                      required: "This field is required",
                    })}
                    placeholder="Enter Description here"
                  />
                  {errors.description && (
                    <p className="text-danger">{errors.description.message}</p>
                  )}
                </div>

                <div className="col-4">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("Dates", {
                      required: "This field is required",
                    })}
                  />
                  {errors.Dates && (
                    <p className="text-danger">{errors.Dates.message}</p>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <label>Gender *</label>
                  <select {...register("gender")} className="form-select">
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label>Category</label>
                  <input
                    type="text"
                    {...register("category", {
                      required: "This field is required",
                    })}
                    className="form-control"
                  />
                  {errors.category && (
                    <p className="text-danger">{errors.category.message}</p>
                  )}
                </div>

                <div className="col-6">
                  <label>Location</label>
                  <input
                    type="text"
                    {...register("address")}
                    className="form-control"
                  />
                  {errors.address && (
                    <p className="text-danger">{errors.address.message}</p>
                  )}
                </div>

                <div className="col-6">
                  <label>Image Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="form-control"
                  />
                  {errors.image && (
                    <p className="text-danger">{errors.image.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-success ms-auto" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
