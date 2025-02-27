import React from 'react';
import { render, screen } from '@testing-library/react';
import { jwtDecode } from 'jwt-decode'; 
import App from '../App';
import AdminHome from '../Components/AdminHome';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn()
}));

describe('App Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('redirects to login if no token is present', () => {
        render(
            <App />

        );

        expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    });

    test('redirects to home if user token is present', () => {
        localStorage.setItem('userToken', 'fake-jwt-token');
        jwtDecode.mockReturnValue({ exp: Date.now() / 1000 + 1000 });

        render (<App />
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });

    test('redirects to admin home if admin token is present', () => {
        localStorage.clear();
        localStorage.setItem('admin', 'fake-admin-jwt-token');
        jwtDecode.mockReturnValue({ exp: Date.now() / 1000 + 1000 });

        const { container } = render(
            <App />
            
        );
        console.log(container.innerHTML);
        
        expect(screen.getByText(/Hi admin/i)).toBeInTheDocument();
    });
});
