export function validateUserName(userName) {
    if (userName.trim().length < 1) {
        return { success: false, message: '用户名不能为空！' };
    }
    return { success: true, message: '' };
}

export function validatePassword(password) {
    if (password.length < 1) {
        return { success: false, message: '密码不能为空！' };
    }
    return { success: true, message: '' };
}

export function validatePasswordRole(password) {
    //const reg = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{5,16}/;
    if ((password.length >= 6) && (password.length <= 16)) {
        return { success: true, message: '' };
    }
    //return { success: false, message: '密码不符合要求！' };
    return { success: false, message: '密码在6-16位！' };
}

/* 是否是公司邮箱*/
export function isWscnEmail(str) {
    const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wallstreetcn\.com$/i;
    return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}
