import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
    email : Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(6, "Password should be atleast 6 characters").required("Password is required")
});

export const signUpSchema = Yup.object().shape({
    email : Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(6, "Password should be atleast 6 characters").required("Password is required"),
    firstName: Yup.string().min(3, "First Name should be atleast 3 characters").required("First Name is required"),
    lastName: Yup.string().min(3, "Last Name should be atleast 3 characters").required("Last Name is required")
})