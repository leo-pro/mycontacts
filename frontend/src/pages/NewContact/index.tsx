import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export default function NewContact() {
  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm buttonLabel="Cadastrar" />
    </>
  );
}
