import { ChangeEvent, FormEvent, useState } from 'react';
import useErrors, { FormFields } from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';

interface ContactFormProps {
  buttonLabel: string
}

export function ContactForm({ buttonLabel }:ContactFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const {
    setError, getErrorsMessageByFieldName, removeError, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

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
      <FormGroup>
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Categoria</option>
          <option value="Instagram">Instagram</option>
          <option value="Discord">Discord</option>
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
