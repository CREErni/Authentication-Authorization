import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AdminLogin from '../Components/AdminLogin';

const mock = new MockAdapter(axios);

describe('AdminLogin Component', () => {
    beforeEach(() => {
        mock.reset();
    });

    test('renders admin login form', () => {
        render(
            <Router>
                <AdminLogin />
            </Router>
        );

        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
    });

    test('displays error message on failed login', async () => {
        mock.onPost('http://localhost:5273/api/admins/login').reply(401, {
            message: 'Invalid username or password',
        });

        render(
            <Router>
                <AdminLogin />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wrongadmin' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
        });
    });

    test('redirects to admin home on successful login', async () => {
        mock.onPost('http://localhost:5273/api/admins/login').reply(200, {
            token: 'fake-admin-jwt-token',
        });

        render(
            <Router>
                <AdminLogin />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

        await waitFor(() => {
            expect(localStorage.getItem('admin')).toBe('fake-admin-jwt-token');
        });
    });
});