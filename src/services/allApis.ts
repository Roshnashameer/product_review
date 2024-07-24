import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// register
export const registerApi = async (body: any) => {
    return await commonApi('POST', `${BASE_URL}/signup`, body, "");
}
// login
export const loginApi = async (body: any) => {
    return await commonApi('POST', `${BASE_URL}/signin`, body, "");
}
// get all products
export const homePdtApi = async () => {
    return await commonApi('GET', `${BASE_URL}/products`, "", "");
}
// get each pdt
export const PdtApi = async (headers: any, id: string | any) => {
    return await commonApi('GET', `${BASE_URL}/products/${id}`, "", headers);
}
// createcomment
export const commentAddApi = async (headers: any, body: any, id: string | any) => {
    return await commonApi('POST', `${BASE_URL}/products/addcomments/${id}`, body, headers);
}
// view comment
export const commentViewApi = async (headers: any, id: string | any) => {
    return await commonApi('GET', `${BASE_URL}/products/${id}/getcomments`, "", headers);
}
// add reply
export const replyAddApi = async (headers: any, body: any, id: string | any) => {
    return await commonApi('POST', `${BASE_URL}/comments/${id}`, body, headers);
}

export const rateProductApi = async (headers: any, body: any, productId: any) => {
    return await commonApi('POST', `${BASE_URL}/${productId}/rate`, body, headers);
};

export const commentDeleteApi = async (headers: any, commentId: string) => {
    return await commonApi('DELETE', `${BASE_URL}/comments/${commentId}`,{}, headers);

};

export const replyDeleteApi = async (headers: any, commentId: string, replyId: string) => {
    return await commonApi('DELETE', `${BASE_URL}/comments/${commentId}/replies/${replyId}`,{}, headers);
};


