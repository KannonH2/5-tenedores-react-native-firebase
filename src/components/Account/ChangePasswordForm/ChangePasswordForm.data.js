import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export function validationSchema() {
  return Yup.object().shape({
    password: Yup.string().required("Este campo es requerido"),
    newPassword: Yup.string().required("Este campo es requerido"),
    confirmNewPassword: Yup.string()
      .required("Este campo es requerido")
      .oneOf(
        [Yup.ref("newPassword")],
        "Las contraseñas tienen que ser iguales"
      ),
  });
}
