import React, { useState, useEffect, useContext } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        console.log('userData:', user);
        if (!user) {
            navigate('/login');
            return;
        }
    });

    const [form, setForm] = useState({
        corporateAccountNo: '',
        corporateName: '',
        userId: '',
        userName: '',
        role: '',
        phoneNo: '',
        email: '',
        otpCode: ''
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await register(form);
            console.log(response.data);
            
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Corporate Account No:</label>
                <input type="text" name="corporateAccountNo" value={form.corporateAccountNo} onChange={handleChange} required />
            </div>
            <div>
                <label>Corporate Name:</label>
                <input type="text" name="corporateName" value={form.corporateName} onChange={handleChange} required />
            </div>
            <div>
                <label>User ID:</label>
                <input type="text" name="userId" value={form.userId} onChange={handleChange} required />
            </div>
            <div>
                <label>User Name:</label>
                <input type="text" name="userName" value={form.userName} onChange={handleChange} required />
            </div>
            <div>
                <label>Role:</label>
                <input type="text" name="role" value={form.role} onChange={handleChange} required />
            </div>
            <div>
                <label>Phone No.:</label>
                <input type="text" name="phoneNo" value={form.phoneNo} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Verification Code:</label>
                <input type="text" name="otpCode" value={form.otpCode} onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterPage;
