import React from 'react';
import useAuthStore from '@/hooks/useAuthStore';
import { Redirect } from 'expo-router';

const withRedirectAlreadyAuth = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        const token = useAuthStore.use.token();
       
        if (token) {
            return <Redirect href="/" />;
        }

        return <Component {...props} />;
    };
};

export default withRedirectAlreadyAuth;
