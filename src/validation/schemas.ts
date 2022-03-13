import * as yup from "yup";

export const LinkSchema = yup.object().shape({
  index: yup.number().positive("A posição tem que ser positiva.").default(0),
  title: yup.string().required("O titulo é obrigatório."),
  href: yup.string().required("O link é obrigatório."),
});
