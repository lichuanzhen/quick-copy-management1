import fetch from '../../utils/fetch';
// -----------------------------文案素材  开始------------------------------------
export function getCopywritingList(pagSize, pageNum) { // 获取文案列表数据
    return fetch({
        url: '/get_data_statistics',
        method: 'get',
        params: {
            pagSize,
            pageNum
        }
    });
}

export function delCopywriting(ids) { // 删除文案
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            ids
        }
    });
}
export function saveCopywriting(data, id) { // 保存文案
    return fetch({
        url: '/get_data_statistics',
        method: 'post',
        data: {
            id,
            data
        }
    });
}

// -----------------------------文案素材  结束------------------------------------