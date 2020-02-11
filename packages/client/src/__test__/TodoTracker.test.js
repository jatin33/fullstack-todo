import React from 'react';
import {render} from '@testing-library/react';
import TodoTracker from "../TodoContainer/TodoTracker";
import '@testing-library/jest-dom/extend-expect';

test('should render form correctly', ()=>{
    const {getByPlaceholderText, getByLabelText, getByText} = render(<TodoTracker/>);
    const button = getByText('Submit');
    const inputbox = getByPlaceholderText('Enter Task');
    const inputLabel = getByLabelText('Task Name:');
    
    expect(button).toBeInTheDocument();
    expect(inputbox).toBeInTheDocument();
    expect(inputLabel).toBeInTheDocument();
});
