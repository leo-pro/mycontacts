/* eslint-disable react/jsx-one-expression-per-line */
import {
  ChangeEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import { Loader } from '../../components/Loader';
import ContactsService, { OrderBy } from '../../services/ContactsService';
import Button from '../../components/Button';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import { Modal } from '../../components/Modal';
import { toast } from '../../utils/toast';
import { ToastType } from '../../interfaces/Toast';

interface Contact{
  id: string;
  name: string;
  email: string;
  phone: string;
  category_name: string;
  category_id: string;
}

export default function Home() {
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

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja excluir o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isDeleteLoading}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input value={searchTerm} onChange={(event) => handleChangeSearchTerm(event)} type="text" placeholder="Pesquisar contato..." />
        </InputSearchContainer>
      )}

      <Header justifyContent={
          // eslint-disable-next-line no-nested-ternary
          hasError
            ? 'flex-end'
            : (contacts.length > 0
              ? 'space-between'
              : 'center'
            )
       }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}

        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError
          && (
          <ErrorContainer>
            <img src={sad} alt="error" />
            <div className="details">
              <span>Ocorreu um erro ao obter os seus contatos!</span>
              <Button type="button" onClick={() => handleTryAgain()}>
                Tentar novamente
              </Button>
            </div>
          </ErrorContainer>
          )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="empty box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!<br />
                Clique no botão <strong>"Novo contato"</strong> à cima para
                cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="magnifier question" />

              <p>Nenhum resultado encontrado para <strong>"{searchTerm}"</strong></p>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="arrow" />
            </button>
          </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>
                    {contact.name}
                  </strong>
                  {contact.category_name && (
                  <small>
                    {contact.category_name}
                  </small>
                  )}
                </div>
                <span>
                  {contact.email}
                </span>
                <span>
                  {contact.phone}
                </span>
              </div>

              <div className="actions">

                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button type="button" onClick={() => handleDeleteContact(contact)}>
                  <img src={trash} alt="Remove" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
}
