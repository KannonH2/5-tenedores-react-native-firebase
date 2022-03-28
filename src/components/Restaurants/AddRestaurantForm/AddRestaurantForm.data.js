import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    description: "",
    location: null,
    images: [],
  };
}

export function validationSchema() {
  return Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    address: Yup.string().required("La dirección es requerida"),
    description: Yup.string().required("La descripción es requerida"),
    location: Yup.object().required("La localizacion es requerida"),
    images: Yup.array()
      .min(1, "Se requiere una imagen como minimo")
      .required("La imagen es requerida"),
  });
}
