import { useState } from "react";
import * as yup from "yup";
const msg = "requerido";
let schema = yup.object().shape({
	categoria: yup.string().required(msg),
	code: yup.string().required(msg),
	descripcion: yup.string().required(msg),
	color: yup.string().required(msg),
	talle: yup.string().required(msg),
	genero: yup.string().required(msg),
	precio: yup.number().required(msg),
	cantidad: yup
		.number()
		.required(msg)
		.positive("No pueden ser numeros negativos")
});

export const useYup = (state) => {
	const [errors, setErrors] = useState([]);
	const handleValidationSchema = () =>
		schema.validate(state).catch((err) => setErrors(ps => ([...ps, err])));
	const handleValidationMessages = () => setErrors([]);

	return { errors, handleValidationMessages, handleValidationSchema };
};
export default schema;
