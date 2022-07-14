import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import useErrors, { FormFields } from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';
import CategoriesService from '../../services/CategoriesService';
import { Category } from '../../interfaces/Category';
import { Contact } from '../../interfaces/Contact';

interface ContactFormProps {
  buttonLabel: string;
  onSubmit: (formData:Contact) => void;
}

export function ContactForm({ buttonLabel, onSubmit }:ContactFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);

  const {
    setError, getErrorsMessageByFieldName, removeError, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: FormFields.NAME, message: 'Nome é obrigatório!' });
    } else {
      removeError(FormFields.NAME);
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: FormFields.EMAIL, message: 'Email é inválido!' });
    } else {
      removeError(FormFields.EMAIL);
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event:FormEvent) {
    event.preventDefault();

    onSubmit({
      name, email, phone, category_id: categoryId,
    });
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)} noValidate>
      <FormGroup error={getErrorsMessageByFieldName(FormFields.NAME)}>
        <Input
          type="text"
          placeholder="Nome (obrigatório)"
          value={name}
          onChange={(event) => handleNameChange(event)}
          error={!!getErrorsMessageByFieldName(FormFields.NAME)}
        />
      </FormGroup>
      <FormGroup error={getErrorsMessageByFieldName(FormFields.EMAIL)}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(event) => handleEmailChange(event)}
          error={!!getErrorsMessageByFieldName(FormFields.EMAIL)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(event) => handlePhoneChange(event)}
          maxLength={15}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button style={{ width: '100%' }} type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
