// import React, { useState } from "react";
// import { TextField, Button, Snackbar } from "@mui/material";
// import { useFormik } from "formik";
// import axios from "axios";
// import { handleSingleFileUpload } from "../utils/awsSingleFileUpload";

// function UpdateBanner() {
//   const [fileSnackbar, setFileSnackbar] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       banner_heading: "",
//       banner_content: "",
//       banner_bg: "",
//       banner_image: "",
//     },
//     onSubmit: async (values) => {
//       console.log(values);
//       const res = await axios.post(
//         "http://localhost:9000/api/update-banner",
//         values
//       );
//       alert(res.data.message);
//     },
//   });

//   const handleDeleteImage = () => {
//     formik.setFieldValue("banner_bg", ""); // Reset image field to empty string
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           size="small"
//           fullWidth
//           margin="dense"
//           variant="filled"
//           id="banner_heading"
//           name="banner_heading"
//           label="Banner Heading"
//           value={formik.values.banner_heading}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.banner_heading &&
//             Boolean(formik.errors.banner_heading)
//           }
//           helperText={
//             formik.touched.banner_heading && formik.errors.banner_heading
//           }
//         />

//         <TextField
//           size="small"
//           fullWidth
//           multiline
//           rows={4}
//           margin="dense"
//           variant="filled"
//           id="banner_content"
//           name="banner_content"
//           label="Banner Content"
//           value={formik.values.banner_content}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.banner_content &&
//             Boolean(formik.errors.banner_content)
//           }
//           helperText={
//             formik.touched.banner_content && formik.errors.banner_content
//           }
//         />
//         <br />
//         <br />
//         <label htmlFor="banner_bg">Banner Background Image:&nbsp;</label>
//         <input
//           type="file"
//           onChange={(e) =>
//             handleSingleFileUpload(
//               e,
//               "banner_bg",
//               "banner_bg",
//               formik,
//               setFileSnackbar
//             )
//           }
//         />
//         <br />
//         {formik.values.banner_bg && (
//           <div>
//             <img
//               src={formik.values.banner_bg}
//               alt="Uploaded Banner Background Image"
//               style={{ width: "100px", height: "100px" }}
//             />
//             <br />
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => handleDeleteImage("banner_bg")}
//             >
//               Delete Image
//             </Button>
//           </div>
//         )}

//         <label htmlFor="banner_bg">Banner Image:&nbsp;</label>
//         <input
//           type="file"
//           onChange={(e) =>
//             handleSingleFileUpload(
//               e,
//               "banner_image",
//               "banner_image",
//               formik,
//               setFileSnackbar
//             )
//           }
//         />
//         <br />
//         {formik.values.banner_image && (
//           <div>
//             <img
//               src={formik.values.banner_image}
//               alt="Uploaded Banner Image"
//               style={{ width: "100px", height: "100px" }}
//             />
//             <br />
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => handleDeleteImage("banner_image")}
//             >
//               Delete Image
//             </Button>
//           </div>
//         )}

//         <br />
//         <br />
//         <button type="submit">Submit</button>
//       </form>

//       {/* Snackbar to show upload success */}
//       <Snackbar
//         open={fileSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setFileSnackbar(false)}
//         message="File uploaded successfully"
//       />
//     </div>
//   );
// }

// export default UpdateBanner;

import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { handleSingleFileUpload } from "../utils/awsSingleFileUpload";

function UpdateBanner() {
  const [fileSnackbar, setFileSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      banner_heading: "",
      banner_content: "",
      banner_bg: "",
      banner_image: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await axios.post(
        "http://localhost:9000/api/update-banner",
        values
      );
      alert(res.data.message);
    },
  });

  const handleDeleteImage = (fieldName) => {
    formik.setFieldValue(fieldName, ""); // Reset the specified image field to an empty string
  };

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          size="small"
          fullWidth
          margin="dense"
          variant="filled"
          id="banner_heading"
          name="banner_heading"
          label="Banner Heading"
          value={formik.values.banner_heading}
          onChange={formik.handleChange}
          error={
            formik.touched.banner_heading &&
            Boolean(formik.errors.banner_heading)
          }
          helperText={
            formik.touched.banner_heading && formik.errors.banner_heading
          }
        />

        <TextField
          size="small"
          fullWidth
          multiline
          rows={4}
          margin="dense"
          variant="filled"
          id="banner_content"
          name="banner_content"
          label="Banner Content"
          value={formik.values.banner_content}
          onChange={formik.handleChange}
          error={
            formik.touched.banner_content &&
            Boolean(formik.errors.banner_content)
          }
          helperText={
            formik.touched.banner_content && formik.errors.banner_content
          }
        />
        <br />
        <br />
        <label htmlFor="banner_bg">Banner Background Image:&nbsp;</label>
        <input
          type="file"
          onChange={(e) =>
            handleSingleFileUpload(
              e,
              "banner_bg",
              "banner_bg",
              formik,
              setFileSnackbar
            )
          }
        />
        <br />
        {formik.values.banner_bg && (
          <div>
            <img
              src={formik.values.banner_bg}
              alt="Uploaded Banner Background Image"
              style={{ width: "100px", height: "100px" }}
            />
            <br />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteImage("banner_bg")} // Pass the field name to delete
            >
              Delete Background Image
            </Button>
          </div>
        )}

        <label htmlFor="banner_image">Banner Image:&nbsp;</label>
        <input
          type="file"
          onChange={(e) =>
            handleSingleFileUpload(
              e,
              "banner_image",
              "banner_image",
              formik,
              setFileSnackbar
            )
          }
        />
        <br />
        {formik.values.banner_image && (
          <div>
            <img
              src={formik.values.banner_image}
              alt="Uploaded Banner Image"
              style={{ width: "100px", height: "100px" }}
            />
            <br />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteImage("banner_image")} // Pass the field name to delete
            >
              Delete Banner Image
            </Button>
          </div>
        )}

        <br />
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Snackbar to show upload success */}
      <Snackbar
        open={fileSnackbar}
        autoHideDuration={3000}
        onClose={() => setFileSnackbar(false)}
        message="File uploaded successfully"
      />
    </div>
  );
}

export default UpdateBanner;
