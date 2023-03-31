import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Contact } from '../../interfaces/Contact';
import { ToastType } from '../../interfaces/Toast';
import ContactsService, { OrderBy } from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.ASC);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState<Contact>();
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const filteredContacts = useMemo(
    () => (
      contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))),
    [searchTerm, contacts],
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === OrderBy.ASC ? OrderBy.DESC : OrderBy.ASC));
  }
  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact: Contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsDeleteLoading(true);

      await ContactsService.deleteContact(contactBeingDeleted?.id as string);

      toast({
        type: ToastType.SUCCESS,
        text: 'Contato deletado com sucesso!',
      });

      handleCloseDeleteModal();
      setContacts(
        (prevState) => prevState.filter((contact) => contact.id !== contactBeingDeleted?.id),
      );
    } catch {
      toast({
        type: ToastType.DANGER,
        text: 'Ocorreu um erro ao deletar o contato!',
      });
    } finally {
      setIsDeleteLoading(false);
    }
  }

  const quantityOfContacts = contacts.length;
  const quantityOfFilteredContacts = filteredContacts.length;

  return {
    isLoading,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeleteLoading,
    quantityOfContacts,
    quantityOfFilteredContacts,
  };
}
