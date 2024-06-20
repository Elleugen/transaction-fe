import React, { useEffect, useState, useContext } from 'react';
import { getTransactions, auditTransaction } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Button, Pagination, Paper, Box
} from '@mui/material';
import '../styles/TableStyles.css';

const TransactionsPage = ({ role }) => {
    const { user } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [orderBy, setOrderBy] = useState('id');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('userData:', user);
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const status = role === 'approver' ? 'awaiting_approval' : 'all';
                const response = await getTransactions(status);
                setTransactions(response.data);
                setFilteredTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchData();
    }, [role]);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        const sortedTransactions = [...filteredTransactions].sort((a, b) => {
            if (a[property] < b[property]) return isAsc ? -1 : 1;
            if (a[property] > b[property]) return isAsc ? 1 : -1;
            return 0;
        });
        setFilteredTransactions(sortedTransactions);
    };

    const handleFilter = (event) => {
        const value = event.target.value.toLowerCase();
        const filtered = transactions.filter(transaction =>
            transaction.toAccountName.toLowerCase().includes(value)
        );
        setFilteredTransactions(filtered);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleAudit = async (id, status) => {
        try {
            await auditTransaction(id, status);
            setTransactions(transactions.filter((tx) => tx.id !== id));
            setFilteredTransactions(filteredTransactions.filter((tx) => tx.id !== id));
        } catch (error) {
            console.error('Error auditing transaction:', error);
        }
    };

    return (
        <div>
            <Box className="container">
                <TextField label="Filter by Name" variant="filled" onChange={handleFilter} />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={orderBy === 'id' ? order : 'asc'}
                                    onClick={() => handleRequestSort('id')}
                                >
                                    Id
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'referenceNo'}
                                    direction={orderBy === 'referenceNo' ? order : 'asc'}
                                    onClick={() => handleRequestSort('referenceNo')}
                                >
                                    Reference No
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>To Account No</TableCell>
                            <TableCell>    
                                To Account Name
                            </TableCell>
                            <TableCell>To Account Bank</TableCell>
                            <TableCell>Transfer Amount</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            {user?.role === 'Approver' && (
                                <TableCell>Actions</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.id}</TableCell>
                                <TableCell>{transaction.referenceNo}</TableCell>
                                <TableCell>{transaction.toAccountNo}</TableCell>
                                <TableCell>{transaction.toAccountName}</TableCell>
                                <TableCell>{transaction.toAccountBank}</TableCell>
                                <TableCell>{transaction.transferAmount}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.status}</TableCell>
                                {user?.role === 'Approver' && (
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleAudit(transaction.id, 'approved')}>Approve</Button>
                                        <Button variant="outlined" onClick={() => handleAudit(transaction.id, 'rejected')}>Reject</Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(filteredTransactions.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                showFirstButton
                showLastButton
            />
        </div>
    );
};

export default TransactionsPage;
