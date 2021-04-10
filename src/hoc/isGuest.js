import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

function isGuest (WrappedComponent) {
    function Component (props) {
        const currentUser = useContext(AuthContext)[0];
        const history = useHistory();
        
        if (currentUser.uid) {
            history.push('/');
            return null;
        }
        
        return <WrappedComponent {...props} />;
    }

    return Component;
}

export default isGuest;