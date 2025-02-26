import React from 'react';
import { Redirect } from 'expo-router';
import useAuthStore from '@/hooks/useAuthStore';

const withRedirectAuth = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        const token = useAuthStore.use.token();
        
        if (!token) {
            return <Redirect href="/sign-in" />;
        }

        return <Component {...props} />;
    };
};

export default withRedirectAuth;
