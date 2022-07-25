/* eslint-disable react/jsx-no-bind */
import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { Contact } from '../../interfaces/Contact';
import { ToastType } from '../../interfaces/Toast';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit(formData:Contact) {
    try {
      const contact:Contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.category_id,
      };

      const response = await ContactsService.createContact(contact);

      toast({
        type: ToastType.SUCCESS,
        text: 'Contato criado com sucesso!',
        duration: 3000,
      });
    } catch {
      toast({
        type: ToastType.DANGER,
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
