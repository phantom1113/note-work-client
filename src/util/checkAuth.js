import { useSelector } from 'react-redux';



function AuthRoute(){
  
    const { isAuthenticated } = useSelector(state => state.user)

    return isAuthenticated
}

export default AuthRoute;

