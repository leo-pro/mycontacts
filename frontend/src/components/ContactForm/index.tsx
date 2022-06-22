import Button from '../Button';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './styles';

interface ContactFormProps {
  buttonLabel: string
}

export function ContactForm({ buttonLabel }:ContactFormProps) {
  return (
    <Form>
      <FormGroup>
        <Input type="text" placeholder="Nome" />
      </FormGroup>
      <FormGroup>
        <Input type="text" placeholder="E-mail" />
      </FormGroup>
      <FormGroup>
        <Input type="text" placeholder="Telefone" />
      </FormGroup>
      <FormGroup>
        <Select>
          <option value="">Categoria</option>
          <option value="Instagram">Instagram</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button style={{ width: '100%' }}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
