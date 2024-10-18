import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  font-family: montserrat;
  width: 300px; /* Adjust width to a more suitable value */
  gap: 10px;
  font-weight: bold;

  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
    width: 100%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  cursor: pointer; /* Add cursor pointer for better UX */
  background: ${(props) => (props.isExpense ? "#ffcccb" : "#ccffcc")}; /* Color based on transaction type */

  &:hover {
    background: #e6e8e9; /* Change background on hover */
  }
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"} onClick={props.onClick}>
      <span>{props.payload.desc}</span>
      <span>${props.payload.amount}</span>
    </Cell>
  );
};

const TransactionComponent = ({ transactions }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    setFilteredTransactions(
      transactions.filter(transaction =>
        transaction.desc.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, transactions]);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    console.log("Selected Transaction:", transaction);
  };

  return (
    <Container>
      <h2>Transactions</h2>
      <input
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredTransactions.length ? (
        filteredTransactions.map((payload) => (
          <TransactionCell
            key={payload.id}
            payload={payload}
            onClick={() => handleTransactionClick(payload)}
          />
        ))
      ) : (
        <div>No transactions found.</div>
      )}
      {selectedTransaction && (
        <div>
          <h3>Selected Transaction:</h3>
          <p>Description: {selectedTransaction.desc}</p>
          <p>Amount: ${selectedTransaction.amount}</p>
          <p>Type: {selectedTransaction.type}</p>
        </div>
      )}
    </Container>
  );
};

export default TransactionComponent;
