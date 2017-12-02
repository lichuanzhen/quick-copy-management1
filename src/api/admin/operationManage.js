import fetch from '../../utils/fetch';
// -----------------------------浏览量  开始------------------------------------
export function getPageviewsList() { // 获取浏览量列表数据
    return fetch({
        url: '/get_data_statistics',
        method: 'get'
    });
}

export function delPageviews(id) { // 删除单条浏览量
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id
        }
    });
}

export function savePageviews(data, id) { // 保存单条浏览量
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id,
            pageviews: data.pageviews,
            content: data.content

        }
    });
}
// -----------------------------浏览量  结束------------------------------------

// -----------------------------作品排行  开始------------------------------------

export function getWorkOutList(data, pagSize, pageNum) { // 获取作品排行列表数据
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

// -----------------------------作品排行  结束------------------------------------