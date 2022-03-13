import * as yup from "yup";

export const LinkSchema = yup.object().shape({
  index: yup.number().default(0),
  title: yup.string().required("O titulo é obrigatório."),
  href: yup.string().required("O link é obrigatório."),
});
