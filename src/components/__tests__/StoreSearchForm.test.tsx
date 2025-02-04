import React, { useState } from 'react';
import { StoreSearchForm } from '../StoreSearchForm';
import '@testing-library/jest-dom';
import { findByText, fireEvent, getByLabelText, getByPlaceholderText, render, waitFor } from '@testing-library/react';
import { Kauppa } from '../../types/kauppa';

describe("S-market search form tests", () => {

    test("Searching for a store", () => {
        const TestForm = () => {
            const [storeArr, setStoreArr] = useState<Kauppa[]>([]);
            return <StoreSearchForm setStoreArr={setStoreArr} />;
        }

        const { getByPlaceholderText, getByText, findByText} = render(<TestForm />);
        const inputField = getByPlaceholderText("70100") as HTMLInputElement;
        const submitButton = getByText("Hae");

        fireEvent.change(inputField, { target: { value: "70100" } });
        expect(inputField.value).toBe("70100");
        fireEvent.click(submitButton);

        waitFor(() => {
            expect(findByText("S-market Kuopio")).toBeInTheDocument();
        });
    })
})