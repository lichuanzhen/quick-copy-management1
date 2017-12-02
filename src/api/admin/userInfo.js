import fetch from '../../utils/fetch';
// -----------------------------用户数据统计  开始------------------------------------
export function getDataStatisticsList(data, offset, page) { // 获取用户数据统计列表数据
    return fetch({
        url: '/User/userList',
        method: 'post',
        data: {
            keywords: {
                startTime: data.beginTime,
                endTime: data.endTime
            },
            offset,
            page
        }
    });
}

export function exportDataStatisticsList(data, offset, page) { // 导出用户数据统计
    return fetch({
        url: '/Export/exportUserStatis',
        method: 'post',
        data: {
            keywords: {
                startTime: data.beginTime,
                endTime: data.endTime
            },
            offset,
            page
        }
    });
}
// -----------------------------用户数据统计  结束------------------------------------


// -----------------------------用户详情统计  开始------------------------------------

export function getDetailsStatisticsList(data, offset, page) { // 获取用户详情统计列表数据
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            wechatNumber: data.wechatNumber,
            userName: data.userName,
            offset,
            page
        }
    });
}

// -----------------------------用户详情统计  结束------------------------------------


// -----------------------------用户作品统计  开始------------------------------------

export function getWorksWStatisticsList(data, offset, page) { // 获取用户作品统计列表数据
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            keywords: {
                startTime: data.beginTime,
                endTime: data.endTime
            },
            wechatNumber: data.wechatNumber,
            userName: data.userName,
            offset,
            page
        }
    });
}

export function exportWorksStatisticsList(data, offset, page) { // 导出用户作品统计数据
    return fetch({
        url: '/export_data_statistics',
        method: 'post',
        data: {
            keywords: {
                startTime: data.beginTime,
                endTime: data.endTime
            },
            wechatNumber: data.wechatNumber,
            userName: data.userName,
            offset,
            page
        }
    });
}
// -----------------------------用户作品统计  结束------------------------------------


// -----------------------------评论审核  开始------------------------------------

export function getReviewAuditList(data, offset, page) { // 获取评论列表数据
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            keywords: {
                startTime: data.beginTime,
                endTime: data.endTime
            },
            offset,
            page
        }
    });
}

export function delReviewAudit(id) { // 删除单条评论
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id
        }
    });
}

export function recoveryReviewAudit(id) { // 恢复单条评论
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id
        }
    });
}
// -----------------------------评论审核  结束------------------------------------