import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  font-family: montserrat;
`;

// Balance display box
const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  font-weight: bold;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// Add transaction button
const AddTransactionButton = styled.button`
  background: black;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;

  &:hover {
    background: #333;
  }
`;

// Transaction form container
const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e68e9a;
  gap: 10px;
  padding: 15px 20px;

  & input {
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;

// Radio button container
const RadioBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// Form to add a transaction
const AddTransactionView = ({ AddTransaction, toggleAddTxn }) => {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");

  const handleAddTransaction = () => {
    if (amount && desc) {
      AddTransaction({ amount: Number(amount), desc, type, id: Date.now() });
      toggleAddTxn();
    }
  };

  return (
    <AddTransactionContainer>
      <input
        placeholder="Amount"
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">EXPENSE</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">INCOME</label>
      </RadioBox>
      <AddTransactionButton onClick={handleAddTransaction}>
        ADD Transaction
      </AddTransactionButton>
    </AddTransactionContainer>
  );
};

// Expense Container and Box
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;

const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  width: 135px;
  font-size: 14px;

  & span {
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => (props.isIncome ? "green" : "red")};
  }
`;

// Main overview component
const OverviewComponent = (props) => {
  const [isAddTxnVisible, toggleAddTxn] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleToggle = () => {
    toggleAddTxn(!isAddTxnVisible);
  };

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const totalExpense = transactions
    .filter((txn) => txn.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalIncome = transactions
    .filter((txn) => txn.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Container>
      <BalanceBox>
        Balance: ${totalIncome - totalExpense}
        <AddTransactionButton onClick={handleToggle}>
          {isAddTxnVisible ? "Cancel" : "ADD"}
        </AddTransactionButton>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTransactionView
          toggleAddTxn={handleToggle}
          AddTransaction={addTransaction}
        />
      )}
      <ExpenseContainer>
        <ExpenseBox isIncome={false}>
          Expense <span>${totalExpense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income <span>${totalIncome}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

export default OverviewComponent;
