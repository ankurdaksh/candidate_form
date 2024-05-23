import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    documents: [
      { fileName: "", fileType: "", file: null },
      { fileName: "", fileType: "", file: null },
    ],
  });
  const [error, setError] = useState("");
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append form data
      Object.keys(data).forEach((key) => {
        if (key === "documents") {
          // Append files separately
          data[key].forEach((document, index) => {
            formData.append(`${key}[${index}].fileName`, document.fileName);
            formData.append(`${key}[${index}].fileType`, document.fileType);
            formData.append(`${key}[${index}].file`, document.file[0]);
          });
        } else if (key === "permanentAddress" || key === "residentialAddress") {
          formData.append(`${key}.street1`, data[key].street1 || "");
          formData.append(`${key}.street2`, data[key].street2 || "");
        } else {
          formData.append(key, data[key]);
        }
      });

      // Send form data with files to the server
      const response = await axios.post(
        "http://localhost:3001/api/v1/submit-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setValue("firstName", "");
        setValue("lastName", "");
        setValue("email", "");
        setValue("dateOfBirth", "");
        setValue("residentialAddress.street1", "");
        setValue("residentialAddress.street2", "");
        setValue("sameAsResidential", false);

        if (!watch("sameAsResidential")) {
          setValue("permanentAddress.street1", "");
          setValue("permanentAddress.street2", "");
        }

        setValue("documents", [
          { fileName: "", fileType: "image", file: null },
          { fileName: "", fileType: "image", file: null },
        ]);
      } else {
        setError("Something Went Wrong");
      }
    } catch (error) {
      setError(error);
    }
  };


  return (
    <div className="bodys">
    <div className="container" style={{maxWidth:"100%"}}>
      {/* { error && {error}} */}      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <div className="inputGroup">
              <div className="inputBox">
                <label for="firstName milk">
                  First Name<span style={{color:'red'}}>*</span>
                </label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  placeholder="Enter your first name here..."
                />
                {errors.firstName && <span style={{color:'red'}}>{errors.firstName.message}</span>}
              </div>

              <div className="inputBox">
                <label for="lastName">
                  Last Name<span style={{color:'red'}}>*</span>
                </label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  placeholder="Enter your Last name here..."
                />
                {errors.lastName && <span style={{color:'red'}}>{errors.lastName.message}</span>}
              </div>
            </div>
            <div className="inputGroup">
              <div className="inputBox">
                <label for="email">
                  Email<span style={{color:'red'}}>*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="ex: myname@example.com..."
                />
                {errors.email && <span style={{color:'red'}}>{errors.email.message}</span>}
              </div>
              <div className="inputBox">
                <label className="inputBox">
                  Date of Birth<span style={{color:'red'}}>*</span>
                </label>
                <input
                  type="date"
                  min={(new Date(new Date().setFullYear(new Date().getFullYear() - 18))).toISOString().split('T')[0]}
                  max={new Date().toISOString().split('T')[0]}
                  {...register("dateOfBirth", {
                    required: "Date of Birth is required"
                  })}
                />
                <small className="note">(Min. age should be 18.)</small>
                {errors.dateOfBirth && (
                  <span style={{color:'red'}}>{errors.dateOfBirth.message}</span>
                )}
                
              </div>
            </div>
          </section>
          <section>
            <h2>Residential Address</h2>
            <div className="inputGroup">
              <div className="inputBox">
                <label for="street1">Street 1<span style={{color:'red'}}>*</span></label>
                <input
                  type="text"
                  {...register("residentialAddress.street1", {
                    required: "Street 1 is required",
                  })}
                />
                {errors.residentialAddress?.street1 && (
                  <span style={{color:'red'}}>{errors.residentialAddress.street1.message}</span>
                )}
              </div>
              <div className="inputBox">
                <label for="street2">Street 2<span style={{color:'red'}}>*</span></label>
                <input
                  type="text"
                  {...register("residentialAddress.street2", {
                    required: "Street 2 is required",
                  })}
                />
                {errors.residentialAddress?.street2 && (
                  <span style={{color:'red'}}>{errors.residentialAddress.street2.message}</span>
                )}
              </div>
            </div>
            <div className="sameAddress">
              <input type="checkbox" {...register("sameAsResidential")} />{' '}
              <label for="sameAddressCheckbo">
                Same as Residential Address
              </label>
            </div>
          </section>
          <section>
            {!watch("sameAsResidential") && (
              <>
                <h2>Permanent Address</h2>
                <div className="inputGroup">
                  <div className="inputBox">
                    <label for="permanentStreet1">Street 1</label>
                    <input
                      type="text"
                      {...register("permanentAddress.street1", {
                        required: "Street 1 is required",
                      })}
                    />

                    {errors.permanentAddress?.street1 && (
                      <span style={{color:'red'}}>{errors.permanentAddress.street1.message}</span>
                    )}
                  </div>
                  <div className="inputBox">
                    <label for="permanentStreet2">Street 2</label>
                    <input
                      type="text"
                      {...register("permanentAddress.street2", {
                        required: "Street 2 is required",
                      })}
                    />
                    {errors.permanentAddress?.street2 && (
                      <span style={{color:'red'}}>{errors.permanentAddress.street2.message}</span>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>
          <section>
            <h2>Upload Documents</h2>
            {formData.documents.map((document, index) => (
              <div key={index} className="docs">
                <div className="inputDocs">
                  <label>
                    File Name<span style={{color:'red'}}>*</span>
                  </label>
                  <input
                    type="text"
                    {...register(`documents[${index}].fileName`, {
                      required: "File Name is required",
                    })}
                  />
                  {errors.documents?.[index]?.fileName && (
                    <span style={{color:'red'}}>{errors.documents[index].fileName.message}</span>
                  )}
                </div>
                <div className="inputBox1">
                  <label for="fileType">Type of File<span style={{color:'red'}}>*</span></label>
                  <span>*</span>
                  <div className="dropdown-container">
                    <select
                      {...register(`documents[${index}].fileType`, {
                        required: "Type of File is required",
                      })}
                    >
                      <option value="image">Image</option>
                      <option value="pdf">PDF</option>
                      {/* Add other file types as needed */}
                    </select>
                    {errors.documents?.[index]?.fileType && (
                      <span style={{color:'red'}}>{errors.documents[index].fileType.message}</span>
                    )}
                    <small className="note">(image, .pdf)</small>
                  </div>
                </div>
                <div className="inputDocs">
                  <label>Upload Document<span style={{color:'red'}}>*</span></label>
                  <input
                  
                    // className="custom-file-input"
                    type="file"
                    {...register(`documents[${index}].file`, {
                      required: "File is required",
                      validate: {
                        validateFileType: (value) => {
                          // Validate file type based on selected type
                          const fileType = watch(
                            `documents[${index}].fileType`
                          );
                          if (
                            fileType === "image" &&
                            !value[0]?.type.startsWith("image")
                          ) {
                            return "Invalid file type. Please upload an image.";
                          } else if (
                            fileType === "pdf" &&
                            !value[0]?.type.startsWith("application/pdf")
                          ) {
                            return "Invalid file type. Please upload a PDF.";
                          }
                          return true;
                        },
                      },
                    })}
                  />
                  {errors.documents?.[index]?.file && (
                    <span style={{color:'red'}}>{errors.documents[index].file.message}</span>
                  )}
                </div>

                {index === 0 ? (
                  <div className="docsBtn">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prevData) => ({
                          ...prevData,
                          documents: [...prevData.documents, {}],
                        }));
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="docsBtn1">
                        <i className="fa fa-trash-o"   onClick={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        documents: prevData.documents.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}></i>
                    </div>
                
                )}
              </div>
            ))}
          </section>
          <div className="btn-submit">
            {" "}
            <button type="submit" className="btns">Submit</button>
          </div>
        </form>
      </main>
    </div>
    </div>
  );
};

export default CandidateForm;
