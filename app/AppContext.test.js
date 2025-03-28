import React from 'react';
import { render, act } from '@testing-library/react-native';
import { AppProvider, AppContext } from './AppContext';
import { describe, it, expect } from '@jest/globals';

describe('AppContext', () => {
    it('should provide default context values', () => {
        let contextValue;
        render(
            <AppProvider>
                <AppContext.Consumer>
                    {value => {
                        contextValue = value;
                        return null;
                    }}
                </AppContext.Consumer>
            </AppProvider>
        );

        expect(contextValue).toEqual(['', expect.any(Function)]);
    });

});
