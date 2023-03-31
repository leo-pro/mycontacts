/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import {
  Container,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import { Loader } from '../../components/Loader';
import Button from '../../components/Button';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import { Modal } from '../../components/Modal';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import useHome from './useHome';

export default function Home() {
  const {
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
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch searchTerm={searchTerm} onChange={(event) => handleChangeSearchTerm(event)} />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={quantityOfContacts}
        quantityOfFilteredContacts={quantityOfFilteredContacts}
      />

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
          {(quantityOfContacts < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="empty box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!<br />
                Clique no botão <strong>"Novo contato"</strong> à cima para
                cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(quantityOfContacts > 0 && quantityOfFilteredContacts < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="magnifier question" />

              <p>Nenhum resultado encontrado para <strong>"{searchTerm}"</strong></p>
            </SearchNotFoundContainer>
          )}

          {quantityOfFilteredContacts > 0 && (
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
                  {contact.category?.name && (
                  <small>
                    {contact.category.name}
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
        </>
      )}

    </Container>
  );
}
