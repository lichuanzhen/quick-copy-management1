import fetch from '../utils/fetch';

export function login(userName, password) {
    return fetch({
        url: '/Admin/login',
        method: 'post',
        data: {
            userName,
            password
        }
    });
}

export function getInfo(sessionId) {
    return fetch({
        url: '/Admin/getUserInfo',
        method: 'post',
        data: {
            sessionId
        }
    });
}

// export function changePassword(oldPassword, newPassword) {
//     return fetch({
//         url: '/user_changePassword',
//         method: 'post',
//         data: {
//             oldPassword,
//             newPassword
//         }
//     });
// }

export function logout(sessionId) {
    return fetch({
        url: '/Admin/loginOut',
        method: 'post',
        data: {
            sessionId
        }
    });
}
