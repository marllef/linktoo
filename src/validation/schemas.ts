import * as yup from "yup";

export const LinkSchema = yup.object().shape({
  title: yup.string().required("O titulo é obrigatório."),
  href: yup.string().required("O link é obrigatório."),
});
