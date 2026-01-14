/* eslint-disable */
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as console from './scheme'

  /**
  * 
  */
  export function putUserAgreements(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.UserAgreementRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/user/agreements`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getInquiryById(request: AxiosInstance,  { inquiryId,queryParams,requestConfig }: { inquiryId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryDetailDto>({
        url: `/api/v1/inquiries/${inquiryId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateInquiry(request: AxiosInstance,  { inquiryId,body,queryParams,requestConfig }: { body: console.InquiryRequestDto,inquiryId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryDetailDto>({
        url: `/api/v1/inquiries/${inquiryId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteInquiry(request: AxiosInstance,  { inquiryId,queryParams,requestConfig }: { inquiryId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/inquiries/${inquiryId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialInquiry(request: AxiosInstance,  { inquiryId,body,queryParams,requestConfig }: { body: console.InquiryPatchRequestDto,inquiryId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryDetailDto>({
        url: `/api/v1/inquiries/${inquiryId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAdminRoleById(request: AxiosInstance,  { adminRoleId,queryParams,requestConfig }: { adminRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminRoleDetailDto>({
        url: `/api/v1/admin/roles/${adminRoleId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateAdminRole(request: AxiosInstance,  { adminRoleId,body,queryParams,requestConfig }: { body: console.AdminRoleRequestDto,adminRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminRoleDetailDto>({
        url: `/api/v1/admin/roles/${adminRoleId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteAdminRoleById(request: AxiosInstance,  { adminRoleId,queryParams,requestConfig }: { adminRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/roles/${adminRoleId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialAdminRole(request: AxiosInstance,  { adminRoleId,body,queryParams,requestConfig }: { body: console.AdminRoleRequestDto,adminRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminRoleDetailDto>({
        url: `/api/v1/admin/roles/${adminRoleId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getUserRolesById(request: AxiosInstance,  { adminUserRoleId,queryParams,requestConfig }: { adminUserRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminUserRoleDetailDto>({
        url: `/api/v1/admin/roles/users/${adminUserRoleId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateUserRoles(request: AxiosInstance,  { adminUserRoleId,body,queryParams,requestConfig }: { body: console.AdminUserRoleRequestDto,adminUserRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminUserRoleDetailDto>({
        url: `/api/v1/admin/roles/users/${adminUserRoleId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteUserRoles(request: AxiosInstance,  { adminUserRoleId,queryParams,requestConfig }: { adminUserRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/roles/users/${adminUserRoleId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialUserRoles(request: AxiosInstance,  { adminUserRoleId,body,queryParams,requestConfig }: { body: console.AdminUserRolePatchRequestDto,adminUserRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminUserRoleDetailDto>({
        url: `/api/v1/admin/roles/users/${adminUserRoleId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getSiteRoleByCode(request: AxiosInstance,  { adminSiteDepartmentRoleId,queryParams,requestConfig }: { adminSiteDepartmentRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminSiteDepartmentRoleDetailDto>({
        url: `/api/v1/admin/roles/sites/${adminSiteDepartmentRoleId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateSiteRole(request: AxiosInstance,  { adminSiteDepartmentRoleId,body,queryParams,requestConfig }: { body: console.AdminSiteDepartmentRoleRequestDto,adminSiteDepartmentRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminSiteDepartmentRoleDetailDto>({
        url: `/api/v1/admin/roles/sites/${adminSiteDepartmentRoleId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteSiteRole(request: AxiosInstance,  { adminSiteDepartmentRoleId,queryParams,requestConfig }: { adminSiteDepartmentRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/roles/sites/${adminSiteDepartmentRoleId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialSiteRole(request: AxiosInstance,  { adminSiteDepartmentRoleId,body,queryParams,requestConfig }: { body: console.AdminSiteDepartmentRolePatchRequestDto,adminSiteDepartmentRoleId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminSiteDepartmentRoleDetailDto>({
        url: `/api/v1/admin/roles/sites/${adminSiteDepartmentRoleId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAdminRoleResourceActionById(request: AxiosInstance,  { adminRoleResourceActionId,queryParams,requestConfig }: { adminRoleResourceActionId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminRoleResourceActionDetailDto>({
        url: `/api/v1/admin/roles/resources/${adminRoleResourceActionId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateAdminRoleResourceAction(request: AxiosInstance,  { adminRoleResourceActionId,body,queryParams,requestConfig }: { body: console.AdminRoleResourceActionRequestDto,adminRoleResourceActionId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminRoleResourceActionDetailDto>({
        url: `/api/v1/admin/roles/resources/${adminRoleResourceActionId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteAdminRoleResourceActionById(request: AxiosInstance,  { adminRoleResourceActionId,queryParams,requestConfig }: { adminRoleResourceActionId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/roles/resources/${adminRoleResourceActionId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialAdminRoleResourceAction(request: AxiosInstance,  { adminRoleResourceActionId,body,queryParams,requestConfig }: { body: console.AdminRoleResourceActionRequestDto,adminRoleResourceActionId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminRoleResourceActionDetailDto>({
        url: `/api/v1/admin/roles/resources/${adminRoleResourceActionId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAdminResourceById(request: AxiosInstance,  { adminResourceId,queryParams,requestConfig }: { adminResourceId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminResourceDetailDto>({
        url: `/api/v1/admin/resources/${adminResourceId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateAdminResource(request: AxiosInstance,  { adminResourceId,body,queryParams,requestConfig }: { body: console.AdminResourceRequestDto,adminResourceId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminResourceDetailDto>({
        url: `/api/v1/admin/resources/${adminResourceId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteAdminResourceById(request: AxiosInstance,  { adminResourceId,queryParams,requestConfig }: { adminResourceId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/resources/${adminResourceId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialAdminResource(request: AxiosInstance,  { adminResourceId,body,queryParams,requestConfig }: { body: console.AdminResourceRequestDto,adminResourceId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminResourceDetailDto>({
        url: `/api/v1/admin/resources/${adminResourceId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getPopupById(request: AxiosInstance,  { popupId,queryParams,requestConfig }: { popupId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.PopupDetailDto>({
        url: `/api/v1/admin/popups/${popupId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePopup(request: AxiosInstance,  { popupId,body,queryParams,requestConfig }: { body: console.PopupRequestDto,popupId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.PopupDetailDto>({
        url: `/api/v1/admin/popups/${popupId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deletePopupById(request: AxiosInstance,  { popupId,queryParams,requestConfig }: { popupId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/popups/${popupId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialPopup(request: AxiosInstance,  { popupId,body,queryParams,requestConfig }: { body: console.PopupRequestDto,popupId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.PopupDetailDto>({
        url: `/api/v1/admin/popups/${popupId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getNoticeById_1(request: AxiosInstance,  { noticeId,queryParams,requestConfig }: { noticeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.NoticeDetailDto>({
        url: `/api/v1/admin/notices/${noticeId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateNotice(request: AxiosInstance,  { noticeId,body,queryParams,requestConfig }: { body: console.NoticeRequestDto,noticeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.NoticeDetailDto>({
        url: `/api/v1/admin/notices/${noticeId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteNoticeById(request: AxiosInstance,  { noticeId,queryParams,requestConfig }: { noticeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/notices/${noticeId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialNotice(request: AxiosInstance,  { noticeId,body,queryParams,requestConfig }: { body: console.NoticeRequestDto,noticeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.NoticeDetailDto>({
        url: `/api/v1/admin/notices/${noticeId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getNoticeTypeById(request: AxiosInstance,  { noticeTypeId,queryParams,requestConfig }: { noticeTypeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.NoticeTypeDetailDto>({
        url: `/api/v1/admin/notice-types/${noticeTypeId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateNoticeType(request: AxiosInstance,  { noticeTypeId,body,queryParams,requestConfig }: { body: console.NoticeTypeRequestDto,noticeTypeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.NoticeTypeDetailDto>({
        url: `/api/v1/admin/notice-types/${noticeTypeId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteNoticeTypeById(request: AxiosInstance,  { noticeTypeId,queryParams,requestConfig }: { noticeTypeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/notice-types/${noticeTypeId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialNoticeType(request: AxiosInstance,  { noticeTypeId,body,queryParams,requestConfig }: { body: console.NoticeTypeRequestDto,noticeTypeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.NoticeTypeDetailDto>({
        url: `/api/v1/admin/notice-types/${noticeTypeId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getInquiryTypeById(request: AxiosInstance,  { inquiryTypeId,queryParams,requestConfig }: { inquiryTypeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryTypeDetailDto>({
        url: `/api/v1/admin/inquiry-types/${inquiryTypeId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateInquiryType(request: AxiosInstance,  { inquiryTypeId,body,queryParams,requestConfig }: { body: console.InquiryTypeRequestDto,inquiryTypeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryTypeDetailDto>({
        url: `/api/v1/admin/inquiry-types/${inquiryTypeId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteInquiryTypeById(request: AxiosInstance,  { inquiryTypeId,queryParams,requestConfig }: { inquiryTypeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/inquiry-types/${inquiryTypeId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialInquiryType(request: AxiosInstance,  { inquiryTypeId,body,queryParams,requestConfig }: { body: console.InquiryTypeRequestDto,inquiryTypeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryTypeDetailDto>({
        url: `/api/v1/admin/inquiry-types/${inquiryTypeId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getInquiryAnswerById(request: AxiosInstance,  { inquiryId,inquiryAnswerId,queryParams,requestConfig }: { inquiryId: number, inquiryAnswerId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryAnswerDetailDto>({
        url: `/api/v1/admin/inquiries/${inquiryId}/answers/${inquiryAnswerId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateInquiryAnswer(request: AxiosInstance,  { inquiryId,inquiryAnswerId,body,queryParams,requestConfig }: { body: console.InquiryAnswerRequestDto,inquiryId: number, inquiryAnswerId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryAnswerDetailDto>({
        url: `/api/v1/admin/inquiries/${inquiryId}/answers/${inquiryAnswerId}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteInquiryAnswer(request: AxiosInstance,  { inquiryId,inquiryAnswerId,queryParams,requestConfig }: { inquiryId: number, inquiryAnswerId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/inquiries/${inquiryId}/answers/${inquiryAnswerId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePartialInquiryAnswer(request: AxiosInstance,  { inquiryId,inquiryAnswerId,body,queryParams,requestConfig }: { body: console.InquiryAnswerPatchRequestDto,inquiryId: number, inquiryAnswerId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryAnswerDetailDto>({
        url: `/api/v1/admin/inquiries/${inquiryId}/answers/${inquiryAnswerId}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getDataAnalysisResultById_1(request: AxiosInstance,  { dataAnalysisResultById,queryParams,requestConfig }: { dataAnalysisResultById: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.DataAnalysisResultDetailDto>({
        url: `/api/v1/admin/data-analysis-result/${dataAnalysisResultById}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateDataAnalysisResult(request: AxiosInstance,  { dataAnalysisResultById,body,queryParams,requestConfig }: { body: console.DataAnalysisResultRequestDto,dataAnalysisResultById: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.DataAnalysisResultDetailDto>({
        url: `/api/v1/admin/data-analysis-result/${dataAnalysisResultById}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteDataAnalysisResult(request: AxiosInstance,  { dataAnalysisResultById,queryParams,requestConfig }: { dataAnalysisResultById: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/data-analysis-result/${dataAnalysisResultById}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updateDataAnalysisResult_1(request: AxiosInstance,  { dataAnalysisResultById,body,queryParams,requestConfig }: { body: console.DataAnalysisResultPatchRequestDto,dataAnalysisResultById: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.DataAnalysisResultDetailDto>({
        url: `/api/v1/admin/data-analysis-result/${dataAnalysisResultById}`,
        method: 'patch'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createHmcMentionScrap(request: AxiosInstance,  { brandGroup,dataSourceType,mentionId,body,queryParams,requestConfig }: { body?: any,brandGroup: string, dataSourceType: string, mentionId: string,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.CommonScrapMentionDetailDto>({
        url: `/api/v1/${brandGroup}/scraps/${dataSourceType}/mentions/${mentionId}`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteMentionScrapById(request: AxiosInstance,  { brandGroup,dataSourceType,mentionId,queryParams,requestConfig }: { brandGroup: string, dataSourceType: string, mentionId: string,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/${brandGroup}/scraps/${dataSourceType}/mentions/${mentionId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createMentionScrap(request: AxiosInstance,  { mentionId,dataSourceType,body,queryParams,requestConfig }: { body?: any,mentionId: string, dataSourceType: 'VOC' | 'UPDATE_SITE',queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.ScrapMentionDetailDto>({
        url: `/api/v1/kia/scraps/mentions/${mentionId}/${dataSourceType}`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteMentionScrapById_1(request: AxiosInstance,  { mentionId,dataSourceType,queryParams,requestConfig }: { mentionId: string, dataSourceType: 'VOC' | 'UPDATE_SITE',queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/kia/scraps/mentions/${mentionId}/${dataSourceType}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllInquiries(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllInquiriesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryResponseDto>({
        url: `/api/v1/inquiries`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createInquiry(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.InquiryRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryDetailDto>({
        url: `/api/v1/inquiries`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createMentionScrap_1(request: AxiosInstance,  { mentionId,dataSourceType,body,queryParams,requestConfig }: { body?: any,mentionId: string, dataSourceType: 'VOC' | 'UPDATE_SITE',queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.ScrapMentionDetailDto>({
        url: `/api/v1/hmc/scraps/mentions/${mentionId}/${dataSourceType}`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteMentionScrapById_2(request: AxiosInstance,  { mentionId,dataSourceType,queryParams,requestConfig }: { mentionId: string, dataSourceType: 'VOC' | 'UPDATE_SITE',queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/hmc/scraps/mentions/${mentionId}/${dataSourceType}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function token(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.HmgSsoTokenRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.HmgSsoTokenResponseDto>({
        url: `/api/v1/auth/token`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function tableauToken(request: AxiosInstance,  { body,queryParams,requestConfig }: { body?: any,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.HmgSsoTokenResponseDto>({
        url: `/api/v1/auth/token/tableau`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function login(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.HmgSsoLoginRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/auth/login`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllAdminRoles(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllAdminRolesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminRoleResponseDto>({
        url: `/api/v1/admin/roles`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createAdminRole(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.AdminRoleRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminRoleDetailDto>({
        url: `/api/v1/admin/roles`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllUserRoles(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllUserRolesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminUserRoleResponseDto>({
        url: `/api/v1/admin/roles/users`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createUserRoles(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.AdminUserRoleRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminUserRoleDetailDto>({
        url: `/api/v1/admin/roles/users`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllSiteRoles(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllSiteRolesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminSiteDepartmentRoleResponseDto>({
        url: `/api/v1/admin/roles/sites`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createSiteRole(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.AdminSiteDepartmentRoleRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminSiteDepartmentRoleDetailDto>({
        url: `/api/v1/admin/roles/sites`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllAdminRoleResourceActions(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllAdminRoleResourceActionsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminRoleResourceActionResponseDto>({
        url: `/api/v1/admin/roles/resources`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createAdminRoleResourceAction(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.AdminRoleResourceActionRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminRoleResourceActionDetailDto>({
        url: `/api/v1/admin/roles/resources`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllAdminResources(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllAdminResourcesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminResourceResponseDto>({
        url: `/api/v1/admin/resources`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createAdminResource(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.AdminResourceRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.AdminResourceDetailDto>({
        url: `/api/v1/admin/resources`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllPopups(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllPopupsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.PopupResponseDto>({
        url: `/api/v1/admin/popups`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createPopup(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.PopupRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.PopupDetailDto>({
        url: `/api/v1/admin/popups`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllNotices(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllNoticesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.NoticeResponseDto>({
        url: `/api/v1/admin/notices`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createNotice(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.NoticeRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.NoticeDetailDto>({
        url: `/api/v1/admin/notices`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllNoticeTypes(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllNoticeTypesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.NoticeTypeResponseDto>({
        url: `/api/v1/admin/notice-types`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createNoticeType(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.NoticeTypeRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.NoticeTypeDetailDto>({
        url: `/api/v1/admin/notice-types`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllInquiryTypes(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllInquiryTypesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryTypeResponseDto>({
        url: `/api/v1/admin/inquiry-types`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createInquiryType(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.InquiryTypeRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryTypeDetailDto>({
        url: `/api/v1/admin/inquiry-types`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllInquiryAnswers_1(request: AxiosInstance,  { inquiryId,queryParams,requestConfig }: { inquiryId: number,queryParams?: console.GetAllInquiryAnswers_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryAnswerResponseDto>({
        url: `/api/v1/admin/inquiries/${inquiryId}/answers`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createInquiryAnswer(request: AxiosInstance,  { inquiryId,body,queryParams,requestConfig }: { body: console.InquiryAnswerRequestDto,inquiryId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.InquiryAnswerDetailDto>({
        url: `/api/v1/admin/inquiries/${inquiryId}/answers`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllDataAnalysisResults(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllDataAnalysisResultsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.DataAnalysisResultResponseDto>({
        url: `/api/v1/admin/data-analysis-result`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function createDataAnalysisResult(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.DataAnalysisResultRequestDto,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.DataAnalysisResultDetailDto>({
        url: `/api/v1/admin/data-analysis-result`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function setResource(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.UserPermission,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<string>({
        url: `/api/test/resources`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function setResourceAction(request: AxiosInstance,  { resourceId,methods,body,queryParams,requestConfig }: { body?: any,resourceId: number, methods: Array<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'>,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<string>({
        url: `/api/test/resources/${resourceId}/${methods}`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getWordCloud(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetWordCloudParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteWordCloudDto>({
        url: `/sw-update-site/api/v1/word-cloud`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopTopics(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetTopTopicsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteThemesDto>({
        url: `/sw-update-site/api/v1/tops/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopThemes(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetTopThemesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteThemesDto>({
        url: `/sw-update-site/api/v1/tops/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopics(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetTopicsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteThemesDto>({
        url: `/sw-update-site/api/v1/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getThemes(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetThemesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteThemesDto>({
        url: `/sw-update-site/api/v1/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopicsByThemeId(request: AxiosInstance,  { themeId,queryParams,requestConfig }: { themeId: string,queryParams?: console.GetTopicsByThemeIdParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteThemesDto>({
        url: `/sw-update-site/api/v1/themes/${themeId}/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionsByThemeIdAndTopicId(request: AxiosInstance,  { themeId,topicId,queryParams,requestConfig }: { themeId: string, topicId: string,queryParams?: console.GetMentionsByThemeIdAndTopicIdParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteThemeMentionsDto>({
        url: `/sw-update-site/api/v1/themes/${themeId}/topics/${topicId}/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionsByThemeIdAndTopicId_1(request: AxiosInstance,  { themeId,topicId,mentionId,queryParams,requestConfig }: { themeId: string, topicId: string, mentionId: string,queryParams?: console.GetMentionsByThemeIdAndTopicId_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteThemeMentionsDetailDto>({
        url: `/sw-update-site/api/v1/themes/${themeId}/topics/${topicId}/mentions/${mentionId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function downloadMentionsByThemeIdAndTopicId(request: AxiosInstance,  { themeId,topicId,queryParams,requestConfig }: { themeId: string, topicId: string,queryParams?: console.DownloadMentionsByThemeIdAndTopicIdParams,requestConfig?: AxiosRequestConfig } ) {
    return request<void>({
        url: `/sw-update-site/api/v1/themes/${themeId}/topics/${topicId}/mentions/excel`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getSummaries(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetSummariesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeSummariesDto>({
        url: `/sw-update-site/api/v1/themes/summaries`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getSuggestions(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetSuggestionsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.SuggestDto>({
        url: `/sw-update-site/api/v1/suggests`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getReports(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetReportsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteReportResponseDto>({
        url: `/sw-update-site/api/v1/reports`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getReportDetail(request: AxiosInstance,  { reportId,queryParams,requestConfig }: { reportId: string,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteReportDetailDto>({
        url: `/sw-update-site/api/v1/reports/${reportId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getRecentQueries(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetRecentQueriesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.QueryResponseDto>({
        url: `/sw-update-site/api/v1/queries/recent`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getPopularQueries(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetPopularQueriesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.QueryResponseDto>({
        url: `/sw-update-site/api/v1/queries/popular`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentions(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetMentionsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteThemeMentionsDto>({
        url: `/sw-update-site/api/v1/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function downloadMentions(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.DownloadMentionsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<void>({
        url: `/sw-update-site/api/v1/mentions/excel`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getUpdateSiteLatestTime(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeLatestTimeDto>({
        url: `/sw-update-site/api/v1/latest-time`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getDistributions(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetDistributionsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteDistributionsDto>({
        url: `/sw-update-site/api/v1/distributions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleSegment(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetVehicleSegmentParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleSegmentCodeDto>({
        url: `/sw-update-site/api/v1/codes/vehicle/segments`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleModel(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetVehicleModelParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleModelCodeDto>({
        url: `/sw-update-site/api/v1/codes/vehicle/models`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleModelTrim(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetVehicleModelTrimParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleModelTrimCodeDto>({
        url: `/sw-update-site/api/v1/codes/vehicle/models/trims`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTags(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetTagsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoTagCodeDto>({
        url: `/sw-update-site/api/v1/codes/tags`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getSoftwareVersions(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetSoftwareVersionsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoSoftwareVersionCodeDto>({
        url: `/sw-update-site/api/v1/codes/software/versions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getSoftwareReleaseMonths(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetSoftwareReleaseMonthsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoSoftwareVersionCodeDto>({
        url: `/sw-update-site/api/v1/codes/software/release-months`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getRatings(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetRatingsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoRatingCodeDto>({
        url: `/sw-update-site/api/v1/codes/ratings`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getPlatforms(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetPlatformsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoPlatformCodeDto>({
        url: `/sw-update-site/api/v1/codes/platforms`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getDevices(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetDevicesParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoDeviceCodeDto>({
        url: `/sw-update-site/api/v1/codes/devices`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getBrands(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetBrandsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoBrandCodeDto>({
        url: `/sw-update-site/api/v1/codes/brands`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getReviewChart(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetReviewChartParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteChartsDto>({
        url: `/sw-update-site/api/v1/charts/reviews`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getRatingChart(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetRatingChartParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.UpdateSiteChartsDto>({
        url: `/sw-update-site/api/v1/charts/ratings`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getWordCloud_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetWordCloud_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeWordCloudDto>({
        url: `/api/v2/kia/word-cloud`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopics_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetTopics_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v2/kia/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getThemes_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetThemes_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v2/kia/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopicsByThemeId_1(request: AxiosInstance,  { themeId,queryParams,requestConfig }: { themeId: string,queryParams: console.GetTopicsByThemeId_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v2/kia/themes/${themeId}/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionsByThemeIdAndTopicId_2(request: AxiosInstance,  { themeId,topicId,queryParams,requestConfig }: { themeId: string, topicId: string,queryParams: console.GetMentionsByThemeIdAndTopicId_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeMentionsDto>({
        url: `/api/v2/kia/themes/${themeId}/topics/${topicId}/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionsByThemeIdAndTopicId_3(request: AxiosInstance,  { themeId,topicId,mentionId,queryParams,requestConfig }: { themeId: string, topicId: string, mentionId: string,queryParams?: console.GetMentionsByThemeIdAndTopicId_3Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeMentionsDetailDto>({
        url: `/api/v2/kia/themes/${themeId}/topics/${topicId}/mentions/${mentionId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getSummaries_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetSummaries_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeSummariesDto>({
        url: `/api/v2/kia/themes/summaries`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentions_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetMentions_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeMentionsDto>({
        url: `/api/v2/kia/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getLatestTime(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeLatestTimeDto>({
        url: `/api/v2/kia/latest-time`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getComplaintRate(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetComplaintRateParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeComplaintRateResponseDto>({
        url: `/api/v2/kia/complaint-rate`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getCharts(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetChartsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeChartsDto>({
        url: `/api/v2/kia/charts`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getWordCloud_2(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetWordCloud_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeWordCloudDto>({
        url: `/api/v2/hmc/word-cloud`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopics_2(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetTopics_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v2/hmc/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getThemes_2(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetThemes_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v2/hmc/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopicsByThemeId_2(request: AxiosInstance,  { themeId,queryParams,requestConfig }: { themeId: string,queryParams: console.GetTopicsByThemeId_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v2/hmc/themes/${themeId}/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionsByThemeIdAndTopicId_4(request: AxiosInstance,  { themeId,topicId,queryParams,requestConfig }: { themeId: string, topicId: string,queryParams: console.GetMentionsByThemeIdAndTopicId_4Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeMentionsDto>({
        url: `/api/v2/hmc/themes/${themeId}/topics/${topicId}/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionsByThemeIdAndTopicId_5(request: AxiosInstance,  { themeId,topicId,mentionId,queryParams,requestConfig }: { themeId: string, topicId: string, mentionId: string,queryParams?: console.GetMentionsByThemeIdAndTopicId_5Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeMentionsDetailDto>({
        url: `/api/v2/hmc/themes/${themeId}/topics/${topicId}/mentions/${mentionId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getSummaries_2(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetSummaries_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeSummariesDto>({
        url: `/api/v2/hmc/themes/summaries`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentions_2(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetMentions_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemeMentionsDto>({
        url: `/api/v2/hmc/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getLatestTime_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeLatestTimeDto>({
        url: `/api/v2/hmc/latest-time`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getComplaintRate_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetComplaintRate_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeComplaintRateResponseDto>({
        url: `/api/v2/hmc/complaint-rate`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getCharts_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetCharts_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeChartsDto>({
        url: `/api/v2/hmc/charts`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getUserInfo(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.FisUserInfoVo>({
        url: `/api/v1/user`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getSuggestions_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetSuggestions_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.SuggestDto>({
        url: `/api/v1/suggests`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getThemeScrap(request: AxiosInstance,  { dataSourceType,queryParams,requestConfig }: { dataSourceType: string,queryParams?: console.GetThemeScrapParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapThemeDto>({
        url: `/api/v1/scraps/${dataSourceType}/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopicScrap(request: AxiosInstance,  { dataSourceType,themeId,queryParams,requestConfig }: { dataSourceType: string, themeId: string,queryParams?: console.GetTopicScrapParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapTopicDto>({
        url: `/api/v1/scraps/${dataSourceType}/themes/${themeId}/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionScrap(request: AxiosInstance,  { dataSourceType,themeId,topicId,queryParams,requestConfig }: { dataSourceType: 'VOC' | 'UPDATE_SITE', themeId: string, topicId: string,queryParams?: console.GetMentionScrapParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CommonScrapMentionDto>({
        url: `/api/v1/scraps/${dataSourceType}/themes/${themeId}/topics/${topicId}/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getUserExcel(request: AxiosInstance,  { dataSourceType,themeId,topicId,queryParams,requestConfig }: { dataSourceType: 'VOC' | 'UPDATE_SITE', themeId: string, topicId: string,queryParams?: console.GetUserExcelParams,requestConfig?: AxiosRequestConfig } ) {
    return request<File>({
        url: `/api/v1/scraps/${dataSourceType}/themes/${themeId}/topics/${topicId}/mentions/excel`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getRecentQueries_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetRecentQueries_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.QueryResponseDto>({
        url: `/api/v1/queries/recent`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getPopularQueries_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetPopularQueries_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.QueryResponseDto>({
        url: `/api/v1/queries/popular`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getPopup(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetPopupParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.PopupResponseDto>({
        url: `/api/v1/popups`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getNotice(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetNoticeParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.NoticeResponseDto>({
        url: `/api/v1/notices`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getNoticeById(request: AxiosInstance,  { noticeId,queryParams,requestConfig }: { noticeId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.NoticeDetailDto>({
        url: `/api/v1/notices/${noticeId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getNoticeType(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetNoticeTypeParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoNoticeTypeCodeDto>({
        url: `/api/v1/notice-types`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopics_3(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetTopics_3Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v1/kia/tops/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getThemes_3(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetThemes_3Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v1/kia/tops/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getThemeScrap_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetThemeScrap_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapThemeDto>({
        url: `/api/v1/kia/scraps/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopicScrap_1(request: AxiosInstance,  { themeId,queryParams,requestConfig }: { themeId: string,queryParams?: console.GetTopicScrap_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapTopicDto>({
        url: `/api/v1/kia/scraps/themes/${themeId}/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionScrap_1(request: AxiosInstance,  { themeId,topicId,queryParams,requestConfig }: { themeId: string, topicId: string,queryParams?: console.GetMentionScrap_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapMentionDto>({
        url: `/api/v1/kia/scraps/themes/${themeId}/topics/${topicId}/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionDetail(request: AxiosInstance,  { themeId,topicId,mentionId,queryParams,requestConfig }: { themeId: string, topicId: string, mentionId: string,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapMentionDetailDto>({
        url: `/api/v1/kia/scraps/themes/${themeId}/topics/${topicId}/mentions/${mentionId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getInquiryType(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetInquiryTypeParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoInquiryTypeCodeDto>({
        url: `/api/v1/inquiry-types`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllInquiryAnswers(request: AxiosInstance,  { inquiryId,queryParams,requestConfig }: { inquiryId: number,queryParams?: console.GetAllInquiryAnswersParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryAnswerResponseDto>({
        url: `/api/v1/inquiries/${inquiryId}/answers`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getLatestTime_2(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.HomeLatestTimeDto>({
        url: `/api/v1/home/latest-time`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopics_4(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetTopics_4Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v1/hmc/tops/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getThemes_4(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.GetThemes_4Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ThemesDto>({
        url: `/api/v1/hmc/tops/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getThemeScrap_2(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetThemeScrap_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapThemeDto>({
        url: `/api/v1/hmc/scraps/themes`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getTopicScrap_2(request: AxiosInstance,  { themeId,queryParams,requestConfig }: { themeId: string,queryParams?: console.GetTopicScrap_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapTopicDto>({
        url: `/api/v1/hmc/scraps/themes/${themeId}/topics`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionScrap_2(request: AxiosInstance,  { themeId,topicId,queryParams,requestConfig }: { themeId: string, topicId: string,queryParams?: console.GetMentionScrap_2Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapMentionDto>({
        url: `/api/v1/hmc/scraps/themes/${themeId}/topics/${topicId}/mentions`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getMentionDetail_1(request: AxiosInstance,  { themeId,topicId,mentionId,queryParams,requestConfig }: { themeId: string, topicId: string, mentionId: string,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.ScrapMentionDetailDto>({
        url: `/api/v1/hmc/scraps/themes/${themeId}/topics/${topicId}/mentions/${mentionId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getDataAnalysisResult(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetDataAnalysisResultParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.DataAnalysisResultResponseDto>({
        url: `/api/v1/data-analysis-result`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getDataAnalysisResultById(request: AxiosInstance,  { dataAnalysisResultById,queryParams,requestConfig }: { dataAnalysisResultById: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.DataAnalysisResultDetailDto>({
        url: `/api/v1/data-analysis-result/${dataAnalysisResultById}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleType(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetVehicleTypeParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleTypeCodeDto>({
        url: `/api/v1/codes/vehicle/types`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleSegment_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetVehicleSegment_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleSegmentCodeDto>({
        url: `/api/v1/codes/vehicle/segments`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleModelByVehicleSegmentId(request: AxiosInstance,  { vehicleSegmentId,queryParams,requestConfig }: { vehicleSegmentId: string,queryParams?: console.GetVehicleModelByVehicleSegmentIdParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleModelCodeDto>({
        url: `/api/v1/codes/vehicle/segments/${vehicleSegmentId}/models`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleModelTrimByVehicleSegmentIdAndVehicleModelId(request: AxiosInstance,  { vehicleSegmentId,vehicleModelId,queryParams,requestConfig }: { vehicleSegmentId: string, vehicleModelId: string,queryParams?: console.GetVehicleModelTrimByVehicleSegmentIdAndVehicleModelIdParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleModelTrimCodeDto>({
        url: `/api/v1/codes/vehicle/segments/${vehicleSegmentId}/models/${vehicleModelId}/trims`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleModel_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetVehicleModel_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleModelCodeDto>({
        url: `/api/v1/codes/vehicle/models`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getVehicleModelTrim_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetVehicleModelTrim_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoVehicleModelTrimCodeDto>({
        url: `/api/v1/codes/vehicle/models/trims`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getFeature(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetFeatureParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoFeatureCodeDto>({
        url: `/api/v1/codes/vehicle/features`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getConsultCategory(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetConsultCategoryParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.CodeResponseDtoConsultCategoryCodeDto>({
        url: `/api/v1/codes/consult-category`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function findUsers(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.FindUsersParams,requestConfig?: AxiosRequestConfig } ) {
    return request<console.AdminUserResponseDto>({
        url: `/api/v1/admin/users`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getAllInquiries_1(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: console.GetAllInquiries_1Params,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryResponseDto>({
        url: `/api/v1/admin/inquiries`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getInquiryById_1(request: AxiosInstance,  { inquiryId,queryParams,requestConfig }: { inquiryId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.InquiryDetailDto>({
        url: `/api/v1/admin/inquiries/${inquiryId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function deleteInquiry_1(request: AxiosInstance,  { inquiryId,queryParams,requestConfig }: { inquiryId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/api/v1/admin/inquiries/${inquiryId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }


