import { useState, useCallback } from 'react';

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

  const setError = useCallback(({ field, message }:ContactFormErrors) => {
    const errorAlreadyExists = errors.find((error) => error.field === FormFields.EMAIL);

    if (errorAlreadyExists) return;

    setErrors((prevState) => [...prevState, { field, message }]);
  }, [errors]);

  const removeError = useCallback((fieldName: FormFields) => {
    setErrors((prevState) => prevState.filter((error) => error.field !== fieldName));
  }, []);

  const getErrorsMessageByFieldName = useCallback((fieldName: FormFields) => (
    errors.find((error) => error.field === fieldName)?.message
  ), [errors]);

  return {
    setError,
    removeError,
    getErrorsMessageByFieldName,
    errors,
  };
}
