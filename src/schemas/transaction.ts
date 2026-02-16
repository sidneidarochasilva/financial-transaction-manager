import * as yup from 'yup'

export const transactionSchema = yup.object({
  description: yup.string().required('Descrição é obrigatória'),
  value: yup.number()
    .typeError('Valor inválido')
    .required('Valor é obrigatório')
    .moreThan(0, 'Valor deve ser maior que zero'),
  type: yup.string()
    .oneOf(['income', 'expense'], 'Tipo inválido')
    .required('Tipo é obrigatório'),
  category: yup.string().required('Categoria é obrigatória'),
  date: yup.string().required('Data é obrigatória'),
})
