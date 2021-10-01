import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.getByText("Contact Form");

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Contact Form');
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByPlaceholderText('Edd');

    userEvent.type(firstNameInput, 'bob');

    await waitFor(() => {
        const errorMessage = screen.queryByText('Error: firstName must have at least 5 characters.');
        expect(errorMessage).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByText('First Name*');
    userEvent.type(firstNameInput, '');

    const lastNameInput = screen.getByText('Last Name*');
    userEvent.type(lastNameInput, '');

    const emailInput = screen.getByText('Email*');
    userEvent.type(emailInput, '');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const firstNameError = screen.queryByText('Error: firstName must have at least 5 characters.');
        expect(firstNameError).toBeInTheDocument();

        const lastNameError = screen.queryByText('Error: lastName is a required field.');
        expect(lastNameError).toBeInTheDocument();

        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText('First Name*');
    userEvent.type(firstNameInput, 'monica');

    const lastNameInput = screen.getByLabelText('Last Name*');
    userEvent.type(lastNameInput, 'salas');

    const emailInput = screen.getByText('Email*');
    userEvent.type(emailInput, '');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const emailInput = screen.getByLabelText('Email*');
    userEvent.type(emailInput, 'asdf');

    await waitFor(() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.');
        expect(emailError).toBeInTheDocument();
    })
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});