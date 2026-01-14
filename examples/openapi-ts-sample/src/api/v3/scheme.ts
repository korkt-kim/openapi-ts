/* eslint-disable */


export interface UserAgreementRequestDto {
  agreements:Array<string>
}

export interface InquiryRequestDto {
  inquiryTypeId:number;title:string;content:string;isSecret:boolean;files?:Array<string>
}

export interface BaseByDto {
  id?:string;name?:string
}

export interface InquiryDetailDto {
  inquiryId:number;type:InquiryTypeCodeDto;title:string;content:string;isSecret:boolean;viewCount:number;files?:Array<string>;status:'WAITING' | 'IN_PROGRESS' | 'COMPLETED';isViewable:boolean;isUpdatable:boolean;isDeletable:boolean;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface InquiryTypeCodeDto {
  id?:string;code?:string;description?:string
}

export interface AdminRoleRequestDto {
  code:string;name:string;description:string
}

export interface AdminRoleDetailDto {
  adminRoleId:number;code:string;name:string;description:string;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface AdminUserRoleRequestDto {
  adminRoleId:number;employeeNumber:string;site:string
}

export interface AdminUserRoleDetailDto {
  adminUserRoleId:number;adminRoleId:number;employeeNumber:string;name:string;email:string;site:string;siteName:string;department:string;departmentName:string;isGeneral:boolean;requestedAt:string;registeredAt:string;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface AdminSiteDepartmentRoleRequestDto {
  adminRoleId:number;site:string;siteName:string;department:string;departmentName:string;requestedAt:string;registeredAt?:string
}

export interface AdminSiteDepartmentRoleDetailDto {
  adminSiteDepartmentRoleId:number;adminRoleId:number;employeeNumber:string;name:string;email:string;site:string;siteName:string;department:string;departmentName:string;isGeneral:boolean;requestedAt:string;registeredAt:string;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface AdminRoleResourceActionRequestDto {
  adminRoleId:number;adminResourceId:number;actions:Array<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'>
}

export interface AdminRoleResourceActionDetailDto {
  adminRoleResourceActionId:number;adminRoleId:number;adminResourceId:number;actions:Array<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'>;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface AdminResourceRequestDto {
  code:string;name:string;description:string
}

export interface AdminResourceDetailDto {
  adminResourceId:number;code:string;name:string;description:string;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface PopupRequestDto {
  title:string;content:string;startAt:string;endAt:string
}

export interface PopupDetailDto {
  popupId:number;title:string;content:string;startAt:string;endAt:string;status:'WAITING' | 'IN_PROGRESS' | 'COMPLETED';createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface NoticeRequestDto {
  noticeTypeId:number;title:string;content:string;files?:Array<string>;isActive:boolean
}

export interface NoticeDetailDto {
  noticeId:number;type:NoticeTypeCodeDto;title:string;content:string;viewCount:number;files?:Array<string>;isActive:boolean;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface NoticeTypeCodeDto {
  id?:string;code?:string;description?:string
}

export interface NoticeTypeRequestDto {
  name:string;isActive:boolean
}

export interface NoticeTypeDetailDto {
  noticeTypeId:number;name:string;isActive:boolean;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface InquiryTypeRequestDto {
  name:string;isActive:boolean
}

export interface InquiryTypeDetailDto {
  inquiryTypeId:number;name:string;isActive:boolean;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface InquiryAnswerRequestDto {
  content:string;files?:Array<string>
}

export interface InquiryAnswerDetailDto {
  inquiryResponseId:number;content:string;files?:Array<string>;isUpdatable:boolean;isDeletable:boolean;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface DataAnalysisResultRequestDto {
  title:string;content?:string;csvFiles?:Array<string>;imageFiles?:Array<string>;isActive:boolean
}

export interface DataAnalysisResultDetailDto {
  dataAnalysisResultId:number;title:string;content:string;csvFiles?:Array<string>;imageFiles?:Array<string>;isActive:boolean;createdBy:BaseByDto;updatedBy:BaseByDto;createdAt:string;updatedAt:string
}

export interface BrandCodeDto {
  id?:string;code?:string;description?:string
}

export interface CommonScrapMentionDetailDto {
  mention:ScrapMentionData;origin:ScrapMentionData;brand:BrandCodeDto;dataSourceType:'VOC' | 'UPDATE_SITE'
}

export interface ScrapMentionData {
  id:string;title?:string
}

export interface ConsultCategoryCodeDto {
  id?:string;code?:string;description?:string
}

export interface EngineTypeCodeDto {
  id?:string;code?:string;description?:string
}

export interface ScrapMentionDetailDto {
  mention:ScrapMentionData;origin:ScrapMentionData;brand:BrandCodeDto;engineType:EngineTypeCodeDto;vehicleModel:VehicleModelCodeDto;vehicleModelTrim:VehicleModelTrimCodeDto;consultCategory:ConsultCategoryCodeDto;dataSourceType:'VOC' | 'UPDATE_SITE'
}

export interface VehicleModelCodeDto {
  id?:string;code?:string;description?:string;brandId?:string;vehicleSegmentId?:string
}

export interface VehicleModelTrimCodeDto {
  id?:string;code?:string;description?:string;brandId?:string;vehicleModelId?:string
}

export interface HmgSsoTokenRequestDto {
  grantType:string;state?:string;code?:string;refreshToken?:string
}

export interface HmgSsoTokenResponseDto {
  accessToken:string;tokenType:string;refreshToken?:string;expiresIn:number
}

export interface HmgSsoLoginRequestDto {
  site:string;upform:'Y' | 'N'
}

export interface UserPermission {
  path?:string;httpMethods?:Array<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'>
}

export interface InquiryPatchRequestDto {
  inquiryTypeId?:number;title?:string;content?:string;isSecret?:boolean;files?:Array<string>
}

export interface AdminUserRolePatchRequestDto {
  adminRoleId?:number;employeeNumber?:string;site?:string
}

export interface AdminSiteDepartmentRolePatchRequestDto {
  adminRoleId?:number;site?:string;siteName?:string;department?:string;departmentName?:string;requestedAt?:string;registeredAt?:string
}

export interface InquiryAnswerPatchRequestDto {
  content?:string;files?:Array<string>
}

export interface DataAnalysisResultPatchRequestDto {
  title?:string;content?:string;csvFiles?:Array<string>;imageFiles?:Array<string>;isActive?:boolean
}

export interface FeatureCodeDto {
  id?:string;code?:string;description?:string
}

export interface UpdateSiteWordCloudDetailDto {
  feature:FeatureCodeDto;count:number
}

export interface UpdateSiteWordCloudDto {
  data?:Array<UpdateSiteWordCloudDetailDto>
}

export interface PageDtoUpdateSiteThemesDetailDto {
  list?:Array<UpdateSiteThemesDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface SentimentTypeCodeDto {
  id?:string;code?:string;description?:string
}

export interface UpdateSiteThemesDetailDto {
  order:number;id:string;title:string;count:number;rate:number;sentiment:number;sentimentType:SentimentTypeCodeDto;sentimentBadge?:string
}

export interface UpdateSiteThemesDto {
  title?:string;count?:number;sentiment?:number;data?:PageDtoUpdateSiteThemesDetailDto
}

export interface DeviceCodeDto {
  id?:string;code?:string;description?:string
}

export interface PageDtoUpdateSiteThemeMentionsDetailDto {
  list?:Array<UpdateSiteThemeMentionsDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface PlatformCodeDto {
  id?:string;code?:string;description?:string;deviceId?:string
}

export interface RatingCodeDto {
  id?:string;code?:string;description?:string
}

export interface SoftwareVersionCodeDto {
  id?:string;code?:string;description?:string;platformIds?:Array<string>;longId?:number
}

export interface TagCodeDto {
  id?:string;code?:string;description?:string
}

export interface UpdateSiteThemeMentionsData {
  list?:Array<string>;highlighting?:Array<string>
}

export interface UpdateSiteThemeMentionsDetailDto {
  theme:string;themeId:string;topic:string;topicId:string;mentionId:string;brand:BrandCodeDto;device:DeviceCodeDto;platform:PlatformCodeDto;softwareVersions?:Array<SoftwareVersionCodeDto>;softwareReleaseMonth?:SoftwareVersionCodeDto;rating:RatingCodeDto;tags?:Array<TagCodeDto>;vehicleSegment:VehicleSegmentCodeDto;vehicleModel:VehicleModelCodeDto;vehicleModelTrim:VehicleModelTrimCodeDto;sentiment:number;sentimentType:SentimentTypeCodeDto;vocInitAt:string;consultInfo:UpdateSiteThemeMentionsData;answerInfo?:UpdateSiteThemeMentionsData;originInfo?:UpdateSiteThemeMentionsData;dataSourceType:'VOC' | 'UPDATE_SITE';isScraped:boolean;likes:number
}

export interface UpdateSiteThemeMentionsDto {
  data?:PageDtoUpdateSiteThemeMentionsDetailDto
}

export interface VehicleSegmentCodeDto {
  id?:string;code?:string;description?:string
}

export interface PageDtoThemeSummariesDetailDto {
  list?:Array<ThemeSummariesDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface ThemeSummariesDetailDto {
  id:string;title:string;content:string;vehicleModelTrims:Array<VehicleModelTrimCodeDto>
}

export interface ThemeSummariesDto {
  data?:PageDtoThemeSummariesDetailDto
}

export interface PageDtoString {
  list?:Array<string>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface SuggestDto {
  data?:PageDtoString
}

export interface PageDtoUpdateSiteReportDetailDto {
  list?:Array<UpdateSiteReportDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface UpdateSiteReportDetailDto {
  reportId:string;device:DeviceCodeDto;platform:PlatformCodeDto;softwareReleaseMonth?:SoftwareVersionCodeDto;features?:Array<string>;rating:number;count:number
}

export interface UpdateSiteReportResponseDto {
  data?:PageDtoUpdateSiteReportDetailDto
}

export interface QueryResponseDto {
  data?:PageDtoString
}

export interface HomeLatestTime {
  latestTime:string
}

export interface HomeLatestTimeDto {
  data:HomeLatestTime
}

export interface UpdateSiteDistributionsData {
  title:string;count:number;rate:number
}

export interface UpdateSiteDistributionsDetailDto {
  count?:number;data?:Array<UpdateSiteDistributionsData>
}

export interface UpdateSiteDistributionsDto {
  data?:Array<UpdateSiteDistributionsDetailDto>
}

export interface CodeResponseDtoVehicleSegmentCodeDto {
  data?:PageDtoVehicleSegmentCodeDto
}

export interface PageDtoVehicleSegmentCodeDto {
  list?:Array<VehicleSegmentCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoVehicleModelCodeDto {
  data?:PageDtoVehicleModelCodeDto
}

export interface PageDtoVehicleModelCodeDto {
  list?:Array<VehicleModelCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoVehicleModelTrimCodeDto {
  data?:PageDtoVehicleModelTrimCodeDto
}

export interface PageDtoVehicleModelTrimCodeDto {
  list?:Array<VehicleModelTrimCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoTagCodeDto {
  data?:PageDtoTagCodeDto
}

export interface PageDtoTagCodeDto {
  list?:Array<TagCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoSoftwareVersionCodeDto {
  data?:PageDtoSoftwareVersionCodeDto
}

export interface PageDtoSoftwareVersionCodeDto {
  list?:Array<SoftwareVersionCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoRatingCodeDto {
  data?:PageDtoRatingCodeDto
}

export interface PageDtoRatingCodeDto {
  list?:Array<RatingCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoPlatformCodeDto {
  data?:PageDtoPlatformCodeDto
}

export interface PageDtoPlatformCodeDto {
  list?:Array<PlatformCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoDeviceCodeDto {
  data?:PageDtoDeviceCodeDto
}

export interface PageDtoDeviceCodeDto {
  list?:Array<DeviceCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoBrandCodeDto {
  data?:PageDtoBrandCodeDto
}

export interface PageDtoBrandCodeDto {
  list?:Array<BrandCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface UpdateSiteChartsData {
  startAt:string;endAt:string;value:number
}

export interface UpdateSiteChartsDetailDto {
  title?:string;data?:Array<UpdateSiteChartsData>
}

export interface UpdateSiteChartsDto {
  data?:Array<UpdateSiteChartsDetailDto>
}

export interface HomeWordCloudDetailDto {
  feature:FeatureCodeDto;count:number
}

export interface HomeWordCloudDto {
  title?:string;data?:Array<HomeWordCloudDetailDto>
}

export interface PageDtoThemesDetailDto {
  list?:Array<ThemesDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface ThemesDetailDto {
  order:number;id:string;title:string;count:number;rate:number;sentiment:number;sentimentType:SentimentTypeCodeDto;sentimentBadge?:string
}

export interface ThemesDto {
  title?:string;count?:number;sentiment?:number;data?:PageDtoThemesDetailDto
}

export interface PageDtoThemeMentionsDetailDto {
  list?:Array<ThemeMentionsDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface ThemeMentionsData {
  list?:Array<string>;highlighting?:Array<string>
}

export interface ThemeMentionsDetailDto {
  theme:string;themeId:string;topic:string;topicId:string;mentionId:string;brand:BrandCodeDto;vehicleSegment:VehicleSegmentCodeDto;vehicleType:VehicleTypeCodeDto;vehicleModel:VehicleModelCodeDto;vehicleModelTrim:VehicleModelTrimCodeDto;engineType:EngineTypeCodeDto;consultCategory:ConsultCategoryCodeDto;sentiment:number;sentimentType:SentimentTypeCodeDto;feature:Array<FeatureCodeDto>;vocInitAt:string;consultInfo:ThemeMentionsData;answerInfo?:ThemeMentionsData;treatInfo?:ThemeMentionsData;originInfo:ThemeMentionsData;dataSourceType:'VOC' | 'UPDATE_SITE';isScraped:boolean
}

export interface ThemeMentionsDto {
  data?:PageDtoThemeMentionsDetailDto
}

export interface VehicleTypeCodeDto {
  id?:string;code?:string;description?:string
}

export interface HomeComplaintRateData {
  consultCategory:ConsultCategoryCodeDto;count:number;rate:number
}

export interface HomeComplaintRateDetailDto {
  name:string;brand:BrandCodeDto;count:number;data?:Array<HomeComplaintRateData>
}

export interface HomeComplaintRateDto {
  title?:string;type?:string;data?:Array<HomeComplaintRateDetailDto>
}

export interface HomeComplaintRateResponseDto {
  data?:Array<HomeComplaintRateDto>
}

export interface HomeChartsData {
  startAt:string;endAt:string;count:number
}

export interface HomeChartsDetailDto {
  consultCategory:ConsultCategoryCodeDto;data?:Array<HomeChartsData>
}

export interface HomeChartsDto {
  title?:string;data?:Array<HomeChartsDetailDto>
}

export interface FisUserInfoVo {
  userId:string;userName:string;site:string;siteName:string;abbreviationSite:string;department:string;departmentName:string;email:string;agreements?:Array<string>;permissions?:Array<UserPermission>
}

export interface PageDtoScrapDetailDto {
  list?:Array<ScrapDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface ScrapDetailDto {
  order:number;id:string;title:string;count:number
}

export interface ScrapThemeDto {
  data?:PageDtoScrapDetailDto
}

export interface ScrapTopicDto {
  data?:PageDtoScrapDetailDto
}

export interface CommonScrapMentionDto {
  data?:PageDtoCommonScrapMentionDetailDto
}

export interface PageDtoCommonScrapMentionDetailDto {
  list?:Array<CommonScrapMentionDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface PageDtoPopupDetailDto {
  list?:Array<PopupDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface PopupResponseDto {
  data?:PageDtoPopupDetailDto
}

export interface NoticeResponseDto {
  data?:PageDtoNoticeDetailDto
}

export interface PageDtoNoticeDetailDto {
  list?:Array<NoticeDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoNoticeTypeCodeDto {
  data?:PageDtoNoticeTypeCodeDto
}

export interface PageDtoNoticeTypeCodeDto {
  list?:Array<NoticeTypeCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface PageDtoScrapMentionDetailDto {
  list?:Array<ScrapMentionDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface ScrapMentionDto {
  data?:PageDtoScrapMentionDetailDto
}

export interface CodeResponseDtoInquiryTypeCodeDto {
  data?:PageDtoInquiryTypeCodeDto
}

export interface PageDtoInquiryTypeCodeDto {
  list?:Array<InquiryTypeCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface InquiryResponseDto {
  data?:PageDtoInquiryDetailDto
}

export interface PageDtoInquiryDetailDto {
  list?:Array<InquiryDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface InquiryAnswerResponseDto {
  data?:PageDtoInquiryAnswerDetailDto
}

export interface PageDtoInquiryAnswerDetailDto {
  list?:Array<InquiryAnswerDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface DataAnalysisResultResponseDto {
  data?:PageDtoDataAnalysisResultDetailDto
}

export interface PageDtoDataAnalysisResultDetailDto {
  list?:Array<DataAnalysisResultDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoVehicleTypeCodeDto {
  data?:PageDtoVehicleTypeCodeDto
}

export interface PageDtoVehicleTypeCodeDto {
  list?:Array<VehicleTypeCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoFeatureCodeDto {
  data?:PageDtoFeatureCodeDto
}

export interface PageDtoFeatureCodeDto {
  list?:Array<FeatureCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface CodeResponseDtoConsultCategoryCodeDto {
  data?:PageDtoConsultCategoryCodeDto
}

export interface PageDtoConsultCategoryCodeDto {
  list?:Array<ConsultCategoryCodeDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface AdminUserDto {
  employeeNumber:string;name:string;site:string;siteName:string;department:string;departmentName:string;isAdmin:boolean
}

export interface AdminUserResponseDto {
  data?:PageDtoAdminUserDto
}

export interface PageDtoAdminUserDto {
  list?:Array<AdminUserDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface AdminRoleResponseDto {
  data?:PageDtoAdminRoleDetailDto
}

export interface PageDtoAdminRoleDetailDto {
  list?:Array<AdminRoleDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface AdminUserRoleResponseDto {
  data?:PageDtoAdminUserRoleDetailDto
}

export interface PageDtoAdminUserRoleDetailDto {
  list?:Array<AdminUserRoleDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface AdminSiteDepartmentRoleResponseDto {
  data?:PageDtoAdminSiteDepartmentRoleDetailDto
}

export interface PageDtoAdminSiteDepartmentRoleDetailDto {
  list?:Array<AdminSiteDepartmentRoleDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface AdminRoleResourceActionResponseDto {
  data?:PageDtoAdminRoleResourceActionDetailDto
}

export interface PageDtoAdminRoleResourceActionDetailDto {
  list?:Array<AdminRoleResourceActionDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface AdminResourceResponseDto {
  data?:PageDtoAdminResourceDetailDto
}

export interface PageDtoAdminResourceDetailDto {
  list?:Array<AdminResourceDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface NoticeTypeResponseDto {
  data?:PageDtoNoticeTypeDetailDto
}

export interface PageDtoNoticeTypeDetailDto {
  list?:Array<NoticeTypeDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface InquiryTypeResponseDto {
  data?:PageDtoInquiryTypeDetailDto
}

export interface PageDtoInquiryTypeDetailDto {
  list?:Array<InquiryTypeDetailDto>;totalElements:number;totalPages:number;currentPage:number;pageSize:number
}

export interface GetAllInquiriesParams {
  type?: string;keyword?: string;'createdBy.id'?: string;'createdBy.name'?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateInquiryParams {
  type?: string;keyword?: string;'createdBy.id'?: string;'createdBy.name'?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllAdminRolesParams {
  code?: string;name?: string;description?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateAdminRoleParams {
  code?: string;name?: string;description?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllUserRolesParams {
  adminRoleId?: number;employeeNumber?: string;name?: string;siteName?: string;departmentName?: string;isGeneral?: boolean;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateUserRolesParams {
  adminRoleId?: number;employeeNumber?: string;name?: string;siteName?: string;departmentName?: string;isGeneral?: boolean;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllSiteRolesParams {
  adminRoleId?: number;siteName?: string;departmentName?: string;isGeneral?: boolean;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateSiteRoleParams {
  adminRoleId?: number;siteName?: string;departmentName?: string;isGeneral?: boolean;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllAdminRoleResourceActionsParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateAdminRoleResourceActionParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllAdminResourcesParams {
  code?: string;name?: string;description?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateAdminResourceParams {
  code?: string;name?: string;description?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllPopupsParams {
  keyword?: string;startAt?: string;endAt?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreatePopupParams {
  keyword?: string;startAt?: string;endAt?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllNoticesParams {
  type?: string;keyword?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateNoticeParams {
  type?: string;keyword?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllNoticeTypesParams {
  keyword?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateNoticeTypeParams {
  keyword?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllInquiryTypesParams {
  keyword?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateInquiryTypeParams {
  keyword?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllInquiryAnswers_1Params {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateInquiryAnswerParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllDataAnalysisResultsParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface CreateDataAnalysisResultParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetWordCloudParams {
  startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string
}

export interface GetTopTopicsParams {
  startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopThemesParams {
  startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopicsParams {
  themeId?: string;startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetThemesParams {
  startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopicsByThemeIdParams {
  startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionsByThemeIdAndTopicIdParams {
  startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionsByThemeIdAndTopicId_1Params {
  brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string
}

export interface DownloadMentionsByThemeIdAndTopicIdParams {
  startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string
}

export interface GetSummariesParams {
  startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetSuggestionsParams {
  query: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetReportsParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetRecentQueriesParams {
  startAt?: string;endAt?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetPopularQueriesParams {
  startAt?: string;endAt?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionsParams {
  themeId?: string;topicId?: string;startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface DownloadMentionsParams {
  themeId?: string;topicId?: string;startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string
}

export interface GetDistributionsParams {
  type: 'RATING' | 'SOFTWARE_RELEASE_MONTH';startAt?: string;endAt?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string
}

export interface GetVehicleSegmentParams {
  brand?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetVehicleModelParams {
  brand?: string;vehicleSegment?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetVehicleModelTrimParams {
  brand?: string;vehicleSegment?: string;vehicleModel?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTagsParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetSoftwareVersionsParams {
  device?: string;platform?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetSoftwareReleaseMonthsParams {
  device?: string;platform?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetRatingsParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetPlatformsParams {
  device?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetDevicesParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetBrandsParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetReviewChartParams {
  type: 'BRAND';startAt?: string;endAt?: string;gap: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string
}

export interface GetRatingChartParams {
  type?: 'BRAND' | 'SOFTWARE_RELEASE_MONTH';startAt?: string;endAt?: string;gap?: string;brand?: string;device?: string;platform?: string;softwareReleaseMonth?: string;vehicleSegment?: string;vehicleModel?: string;vehicleModelTrim?: string;rating?: string;tag?: string;query?: string
}

export interface GetWordCloud_1Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string
}

export interface GetTopics_1Params {
  themeId?: string;startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetThemes_1Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopicsByThemeId_1Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionsByThemeIdAndTopicId_2Params {
  sentimentType?: string;startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionsByThemeIdAndTopicId_3Params {
  brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string
}

export interface GetSummaries_1Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentions_1Params {
  themeId?: string;topicId?: string;sentimentType?: string;startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetComplaintRateParams {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string
}

export interface GetChartsParams {
  startAt: string;endAt: string;gap: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string
}

export interface GetWordCloud_2Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string
}

export interface GetTopics_2Params {
  themeId?: string;startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetThemes_2Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopicsByThemeId_2Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionsByThemeIdAndTopicId_4Params {
  sentimentType?: string;startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionsByThemeIdAndTopicId_5Params {
  brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string
}

export interface GetSummaries_2Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentions_2Params {
  themeId?: string;topicId?: string;sentimentType?: string;startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetComplaintRate_1Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string
}

export interface GetCharts_1Params {
  startAt: string;endAt: string;gap: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string
}

export interface GetSuggestions_1Params {
  brand?: string;query: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetThemeScrapParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopicScrapParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionScrapParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetUserExcelParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetRecentQueries_1Params {
  startAt?: string;endAt?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetPopularQueries_1Params {
  startAt?: string;endAt?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetPopupParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetNoticeParams {
  type?: string;keyword?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetNoticeTypeParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopics_3Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetThemes_3Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetThemeScrap_1Params {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopicScrap_1Params {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionScrap_1Params {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetInquiryTypeParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllInquiryAnswersParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopics_4Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetThemes_4Params {
  startAt: string;endAt: string;brand?: string;engineType?: string;vehicleSegment?: string;vehicleType?: string;vehicleModel?: string;vehicleModelTrim?: string;consultCategory?: string;feature?: string;query?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetThemeScrap_2Params {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetTopicScrap_2Params {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetMentionScrap_2Params {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetDataAnalysisResultParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetVehicleTypeParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetVehicleSegment_1Params {
  brand?: string;engineType?: string;vehicleType?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetVehicleModelByVehicleSegmentIdParams {
  brand?: string;engineType?: string;vehicleType?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetVehicleModelTrimByVehicleSegmentIdAndVehicleModelIdParams {
  brand?:Array<string>;engineType?:string;vehicleType?:string;page?:string;pageSize?:string;sort?:string;direction?:string
}

export interface GetVehicleModel_1Params {
  brand?: string;engineType?: string;vehicleType?: string;vehicleSegment?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetVehicleModelTrim_1Params {
  brand?: string;engineType?: string;vehicleType?: string;vehicleSegment?: string;vehicleModel?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetFeatureParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetConsultCategoryParams {
  page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface FindUsersParams {
  keyword?: string;employeeNumber?: string;name?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}

export interface GetAllInquiries_1Params {
  type?: string;keyword?: string;'createdBy.id'?: string;'createdBy.name'?: string;queryOperation?: string;page?: string;pageSize?: string;sort?: string;direction?: string
}
