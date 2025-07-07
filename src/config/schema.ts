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
});

export const logoSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title should be atleast 3 characters").required("Title is required"),
    description: Yup.string().min(10, "Description should be atleast 10 characters").required("Description is required"),
    industry: Yup.string().required("Industry is required"),
    logoStyle: Yup.string().required("Logo Style is required"),
    colorPalette: Yup.string().required("Color Palette is required"),
    includeBrandOrText: Yup.boolean(),
    includeIcons: Yup.boolean()
})