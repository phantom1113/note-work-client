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