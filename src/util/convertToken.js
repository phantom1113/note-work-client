import jwtDecode from 'jwt-decode';

export const convertToken = (token) => {
    let user = {}
    if (token === '') {
        return ''
    } else {
        const decodedToken = jwtDecode(token);
        user = decodedToken;
        return user.username
    }
}

export const checkToken = (token) => {
    if (token) {
        if(jwtDecode(token).exp > Date.now() / 1000){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}