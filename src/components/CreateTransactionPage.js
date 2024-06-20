import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import '../styles/CreateTransactionPage.css';
import { UserContext } from '../UserContext';

const CreateTransactionPage = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {
        console.log('userData:', user);
        if (!user) {
            navigate('/login');
            return;
        }
    });

    const [form, setForm] = useState({
        toAccountNo: '',
        toAccountName: '',
        toAccountBank: '',
        transferAmount: '',
        description: '',
        group: '',
        status: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(form);

        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    const handleCancel = () => {
        navigate('/home');
    };

    return (
                <div className="add-transaction">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="To Account No"
                            variant="filled"
                            fullWidth
                            required
                            name="toAccountNo"
                            value={form.toAccountNo}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="To Account Name"
                            variant="filled"
                            fullWidth
                            required
                            name="toAccountName"
                            value={form.toAccountName}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="To Account Bank"
                            variant="filled"
                            fullWidth
                            required
                            name="toAccountBank"
                            value={form.toAccountBank}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Transfer Amount"
                            variant="filled"
                            fullWidth
                            required
                            name="transferAmount"
                            type="number"
                            value={form.transferAmount}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <div className="form-actions">
                            <Button variant="contained" color="primary" type="submit">Add Transaction</Button>
                        </div>
                    </form>
                </div>
        // <Card className="container">
        //     <CardContent>
        //     </CardContent>
        // </Card>
    );
};

export default CreateTransactionPage;
