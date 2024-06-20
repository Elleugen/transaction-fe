import React, { useEffect, useState, useContext } from 'react';
import { getTransactionOverview, getTransactions, getTransactionDetail } from '../services/api';
import TransactionList from './TransactionList';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Button, Pagination, Paper, Box, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import '../styles/TableStyles.css';
import '../styles/OverviewStyles.css';

const HomePage = () => {
    const { user } = useContext(UserContext);
    const [overview, setOverview] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [orderBy, setOrderBy] = useState('id');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            // getTransactionOverview()
            try {
                const overviewResponse = await getTransactionOverview();
                setOverview(overviewResponse.data);
            } catch (error) {
                console.error('Error fetching getTransactionOverview() data:', error);
            }

            // getTransactions()
            try {
                const transactionsResponse = await getTransactions('all');
                setTransactions(transactionsResponse.data);
                setFilteredTransactions(transactionsResponse.data);
            } catch (error) {
                console.error('Error fetching getTransactions() data:', error);
            }
        };

        fetchData();
    }, [user, navigate]);

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

    const handleTransactionDetail = async (id) => {
        try {
            const response = await getTransactionDetail(id);
            setSelectedTransaction(response.data);
            setOpen(true);
        } catch (error) {
            console.error('Error fetching transaction details:', error);
        }
        console.log('selectedTransaction(): ', selectedTransaction);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTransaction(null);
    };

    return (
        <div>
            <h1>Welcome, {user?.userName} - {user?.role}</h1>
            {/* <p>Awaiting Approval: {overview.awaitingApproval}</p>
            <p>Approved: {overview.approved}</p>
            <p>Rejected: {overview.rejected}</p> */}

            <Card className="card-container">
                <h3>Transaction Overview</h3>
                <Box className="overview-container">
                    <Card className="overview-card">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">Awaiting Approval</Typography>
                            <Typography variant="h3" color="primary">
                                {overview.awaitingApproval === null || overview.awaitingApproval === undefined ? 0 : overview.awaitingApproval}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="overview-card">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">Approved</Typography>
                            <Typography variant="h3" color="primary">
                                {overview.approved === null || overview.approved === undefined ? 0 : overview.approved}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="overview-card">
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">Rejected</Typography>
                            <Typography variant="h3" color="error">
                                {overview.rejected === null || overview.rejected === undefined ? 0 : overview.rejected}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Card>
            <Box className="container">
                <TextField label="Filter by Name" variant="filled" onChange={handleFilter} />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                            <TableCell>
                                Status
                            </TableCell>
                            <TableCell>
                                
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.referenceNo}</TableCell>
                                <TableCell>{transaction.toAccountNo}</TableCell>
                                <TableCell>{transaction.toAccountName}</TableCell>
                                <TableCell>{transaction.toAccountBank}</TableCell>
                                <TableCell>{transaction.transferAmount}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.status}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary"  onClick={() => handleTransactionDetail(transaction.id)}>more</Button>
                                </TableCell>
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


            {selectedTransaction && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Transaction Details</DialogTitle>
                    <DialogContent>
                        <Typography>ID: {selectedTransaction.id}</Typography>
                        <Typography>Reference No: {selectedTransaction.referenceNo}</Typography>
                        <Typography>To Account No: {selectedTransaction.toAccountNo}</Typography>
                        <Typography>To Account Name: {selectedTransaction.toAccountName}</Typography>
                        <Typography>To Account Bank: {selectedTransaction.toAccountBank}</Typography>
                        <Typography>Transfer Amount: {selectedTransaction.transferAmount}</Typography>
                        <Typography>Description: {selectedTransaction.description}</Typography>
                        <Typography>Status: {selectedTransaction.status}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default HomePage;
