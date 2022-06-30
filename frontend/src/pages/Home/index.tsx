import { Link } from 'react-router-dom';
import {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';
import {
  Container, Header, ListHeader, Card, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import { Loader } from '../../components/Loader';
import delay from '../../utils/delay';

interface Contact{
  id: string;
  name: string;
  email: string;
  phone: string;
  category_name: string;
  category_id: string;
}

enum OrderBy {
  ASC = 'asc',
  DESC = 'desc'
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.ASC);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filteredContacts = useMemo(
    () => (
      contacts.filter((contact) => (
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))),
    [searchTerm, contacts],
  );

  useEffect(() => {
    setIsLoading(true);

    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        await delay(1000);

        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === OrderBy.ASC ? OrderBy.DESC : OrderBy.ASC));
  }
  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input value={searchTerm} onChange={(event) => handleChangeSearchTerm(event)} type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <a href="/new">Novo contato</a>
      </Header>

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
            <button type="button">
              <img src={trash} alt="Remove" />
            </button>
          </div>
        </Card>
      ))}

    </Container>
  );
}
