import fetch from '../../utils/fetch';
// -----------------------------后台用户管理  开始------------------------------------
export function getBackgroundUserList(data, pagSize, pageNum) { // 获取后台用户列表数据
    return fetch({
        url: '/get_data_statistics',
        method: 'get',
        params: {
            beginTime: data.beginTime,
            endTime: data.endTime,
            pagSize,
            pageNum
        }
    });
}

export function delBackgroundUser(id) { // 删除用户
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id
        }
    });
}

export function saveBackgroundUser(id, data) { // 新增用户
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id,
            userName: data.userName,
            password: data.password,
            description: data.description
        }
    });
}

// -----------------------------后台用户管理  结束------------------------------------