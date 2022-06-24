import { useState } from 'react';

export enum FormFields{
  NAME = 'name',
  EMAIL = 'email',
  PHONE = 'phone',
  CATEGORY = 'category'
}

interface ContactFormErrors{
  field: FormFields,
  message: string
}

export default function useErrors() {
  const [errors, setErrors] = useState<Array<ContactFormErrors>>([]);

  function setError({ field, message }:ContactFormErrors) {
    const errorAlreadyExists = errors.find((error) => error.field === FormFields.EMAIL);

    if (errorAlreadyExists) return;

    setErrors((prevState) => [...prevState, { field, message }]);
  }

  function removeError(fieldName: FormFields) {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }

  function getErrorsMessageByFieldName(fieldName: FormFields) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    setError,
    removeError,
    getErrorsMessageByFieldName,
    errors,
  };
}
