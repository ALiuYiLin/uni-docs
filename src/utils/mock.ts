// mock请求
export const Request = <T>(url: string, data: T): Promise<{ code: number, msg: string, data: T }> => {
    // 等待200-500ms返回
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 0,
                msg: 'success',
                data
            });
        }, Math.random() * 300 + 200);
    });
}