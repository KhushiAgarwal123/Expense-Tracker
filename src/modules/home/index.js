import styled from "styled-components";
import OverviewComponent from './OverviewComponent';  
import TransactionComponent from "./TransactionComponent"; 
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  font-family: montserrat; 
  width: 360px;
`;

const HomeComponent = (props) => {
    const [transactions, updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0); 

    const AddTransactionButton = (payload) => {
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransaction(transactionArray);
    };

    const calculateBalance = () => {
        let exp = 0;
        let inc = 0;

        transactions.forEach((payload) => {
            if (payload.type === "EXPENSE") {
                exp += payload.amount;
            } else {
                inc += payload.amount;
            }
        });

        updateExpense(exp);
        updateIncome(inc); 
    };

    useEffect(() => {
        calculateBalance();
    }, [transactions]);

    return (
        <Container>
            <h1>Home Component</h1>
            <OverviewComponent 
                AddTransactionButton={AddTransactionButton} 
                expense={expense} 
                income={income} 
            />
            <TransactionComponent transactions={transactions} />
        </Container>
    );
};

export default HomeComponent;
