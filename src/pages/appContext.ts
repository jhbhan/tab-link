import { createContext } from 'react';
import { LinkModel } from '../models/Models';

interface AppContextType {
    userId: string,
    userEmail: string
}

const AppContextDefault = {
    userId: '',
    userEmail: ''
}

export const AppContext = createContext<AppContextType>(AppContextDefault);