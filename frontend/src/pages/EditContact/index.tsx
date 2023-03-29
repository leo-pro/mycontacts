import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContactForm, ContactFormRef } from '../../components/ContactForm';
import { Loader } from '../../components/Loader';
import { PageHeader } from '../../components/PageHeader';
import useSafeAsyncAction from '../../hooks/useSafeSyncAction';
import { Contact } from '../../interfaces/Contact';
import { ToastType } from '../../interfaces/Toast';
import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>('');

  const contactFormRef = useRef<ContactFormRef>(null);

  const { id }:any = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactData = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current?.setFieldsValues(contactData);

          setIsLoading(false);
          setContactName(contactData?.name);
        });
      } catch {
        safeAsyncAction(() => {
          navigate('/');
          toast({
            type: ToastType.DANGER,
            text: 'Contato não encontrado!',
          });
        });
      }
    }

    loadContacts();
  }, [id, navigate, safeAsyncAction]);

  async function handleSubmit(contact:Contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData?.name);

      toast({
        type: ToastType.SUCCESS,
        text: 'Contato alterado com sucesso!',
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
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
