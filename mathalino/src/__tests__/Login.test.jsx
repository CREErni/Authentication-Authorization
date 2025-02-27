import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../Components/Login';

const mock = new MockAdapter(axios);

describe('Login Component', () => {
    beforeEach(() => {
        mock.reset();
    });

    test('renders login form', () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
    });

    test('displays error message on failed login', async () => {
        mock.onPost('http://localhost:5273/api/users/login').reply(401, {
            message: 'Invalid username or password',
        });

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
        });
    });

    test('redirects to home on successful login', async () => {
        mock.onPost('http://localhost:5273/api/users/login').reply(200, {
            user: { username: 'testuser' },
            token: 'fake-jwt-token',
        });

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'carl' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'carl' } });
        fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

        await waitFor(() => {
            expect(localStorage.getItem('userToken')).toBe('fake-jwt-token');
        });
    });
});