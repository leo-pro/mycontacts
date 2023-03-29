/* eslint-disable react/jsx-no-bind */
import { useRef } from 'react';
import { ContactForm, ContactFormRef } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { Contact } from '../../interfaces/Contact';
import { ToastType } from '../../interfaces/Toast';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef<ContactFormRef>(null);

  async function handleSubmit(contact:Contact) {
    try {
      await ContactsService.createContact(contact);

      contactFormRef.current?.resetFields();

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

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} ref={contactFormRef} />
    </>
  );
}
