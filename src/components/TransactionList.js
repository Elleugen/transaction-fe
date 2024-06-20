import React from 'react';

const TransactionList = ({ transactions, onAudit, role }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Reference No</th>
                    <th>To Account No</th>
                    <th>To Account Name</th>
                    <th>To Account Bank</th>
                    <th>Transfer Amount</th>
                    <th>Description</th>
                    <th>Status</th>
                    {role === 'approver' && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.referenceNo}</td>
                        <td>{transaction.toAccountNo}</td>
                        <td>{transaction.toAccountName}</td>
                        <td>{transaction.toAccountBank}</td>
                        <td>{transaction.transferAmount}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.status}</td>
                        {role === 'approver' && (
                            <td>
                                <button onClick={() => onAudit(transaction.id, 'approved')}>Approve</button>
                                <button onClick={() => onAudit(transaction.id, 'rejected')}>Reject</button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionList;
