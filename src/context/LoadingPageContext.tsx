"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

type LoadingPageContextType = {
    isPageLoading: boolean;
    setIsPageLoading: (loading: boolean) => void;
};

const LoadingPageContext = createContext<LoadingPageContextType | undefined>(undefined);

export const LoadingPageProvider = ({ children }: { children: ReactNode }) => {
    const [isPageLoading, setIsPageLoading] = useState(false);

    return (
        <LoadingPageContext.Provider value={{ isPageLoading, setIsPageLoading }}>
            {children}
        </LoadingPageContext.Provider>
    );
};

export const useLoadingPage = () => {
    const context = useContext(LoadingPageContext);
    if (context === undefined) {
        throw new Error('useLoadingPage must be used within a LoadingPageProvider');
    }
    return context;
};