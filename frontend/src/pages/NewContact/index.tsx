/* eslint-disable react/jsx-no-bind */
import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { Contact } from '../../interfaces/Contact';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  async function handleSubmit(formData:Contact) {
    const contact:Contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.category_id,
    };

    const response = await ContactsService.createContact(contact);

    console.log(response);
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
