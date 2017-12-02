import fetch from '../../utils/fetch';
// -----------------------------作品管理  开始------------------------------------
export function getWorksList(data, pagSize, pageNum) { // 获取作品列表数据
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

export function delWork(id) { // 删除作品
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id
        }
    });
}

export function upWork(id) { // 上传作品
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id
        }
    });
}

export function downWork(id) { // 下架作品
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id
        }
    });
}

export function saveWork(id) { // 保存作品
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id
        }
    });
}

// -----------------------------作品管理  结束------------------------------------