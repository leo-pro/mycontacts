/* eslint-disable react/jsx-one-expression-per-line */
import {
  Container,
} from './styles';

import { Loader } from '../../components/Loader';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import useHome from './useHome';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import { Modal } from '../../components/Modal';

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
            <ErrorStatus onTryAgain={handleTryAgain} />
          )}

      {!hasError && (
        <>
          {(quantityOfContacts < 1 && !isLoading) && (
            <EmptyList />
          )}

          {(quantityOfContacts > 0 && quantityOfFilteredContacts < 1) && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
          />

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
