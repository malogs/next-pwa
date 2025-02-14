'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const groupTransactionsByDate = (transactions: ITransaction[]) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce((acc: { [x: string]: ITransaction[]; }, transaction: ITransaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionDateString = transactionDate.toISOString().split("T")[0];

      let groupLabel;

      if (transactionDate.toDateString() === today.toDateString()) {
        groupLabel = "Today";
      } else if (transactionDate.toDateString() === yesterday.toDateString()) {
        groupLabel = "Yesterday";
      } else {
        groupLabel = transactionDateString; // Use full date as label
      }

      if (!acc[groupLabel]) acc[groupLabel] = [];
      acc[groupLabel].push({
        ...transaction,
        time: transactionDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
      });

      return acc;
    }, {});
};

const TransactionsList = () => {
  const [rawTX, setRawTX] = useState<ITransaction[]>([]);
  const [transactions, setTransactions] = useState<{ [x: string]: ITransaction[]; }>({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('maL_transactions') ?? '[]');
    setRawTX(stored);
    setTransactions(groupTransactionsByDate(stored));
  }, []);

  return (
    <div>
      {rawTX.length === 0 && <p className='text-center'>No transaction made yet!</p>}
      {Object.keys(transactions).map((date) => (
        <>
          <p>{date}</p>
          <ul key={date}>
          {transactions[date].map((transaction) => 
            <li key={transaction.receipient.name + '-' + transaction.date} className='flex flex-row gap-4'>
              <div>
                <Image
                  src={
                    transaction.receipient.image
                      ? transaction.receipient.image
                      : `https://ui-avatars.com/api/?background=random&name=${transaction.receipient.name.replaceAll(
                          ' ',
                          '+'
                        )}`
                  }
                  height={50}
                  width={50}
                  alt='transaction-image'
                />
              </div>
              <div className='grid gap-1.5 flex-1'>
                <p className='font-bold'>{transaction.receipient.name || transaction.receipient.phone}</p>
                <p>{transaction.reason}</p>
              </div>
              <div className='grid gap-1.5 text-right'>
                <p className='font-bold text-xl'>{transaction.amount}<span className='text-sm'>RWF</span></p>
                <p>{transaction.time}</p>
              </div>
            </li>)
            }
          </ul>
        </>
      ))}
    </div>
  );
};

export default TransactionsList;
