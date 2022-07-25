import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ContactForm } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';
import { PageHeader } from '../../components/PageHeader';
import { Contact } from '../../interfaces/Contact';
import { ToastType } from '../../interfaces/Toast';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

interface ContactFormRef{
  setFieldsValues: (contact:Contact) => void
}

export default function EditContact() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contactFormRef = useRef<ContactFormRef>(null);

  const { id }:any = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactData = await ContactsService.getContactById(id);

        contactFormRef.current?.setFieldsValues(contactData);

        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          type: ToastType.DANGER,
          text: 'Contato não encontrado!',
        });
      }
    }

    loadContacts();
  }, [id, history]);

  function handleSubmit() {
    //
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title="Editar contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
