/* eslint-disable */
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as admin from './scheme'

  /**
  * Add a new pet to the store.
  */
  export function addPet(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: admin.Pet | admin.Pet,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<admin.Pet>({
        url: `/pet`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Update an existing pet by Id.
  */
  export function updatePet(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: admin.Pet | admin.Pet,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<admin.Pet>({
        url: `/pet`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Multiple status values can be provided with comma separated strings.
  */
  export function findPetsByStatus(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: admin.FindPetsByStatusParams,requestConfig?: AxiosRequestConfig } ) {
    return request<Array<admin.Pet>>({
        url: `/pet/findByStatus`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
  */
  export function findPetsByTags(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: admin.FindPetsByTagsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<Array<admin.Pet>>({
        url: `/pet/findByTags`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Returns a single pet.
  */
  export function getPetById(request: AxiosInstance,  { petId,queryParams,requestConfig }: { petId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<admin.Pet>({
        url: `/pet/${petId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Updates a pet resource based on the form data.
  */
  export function updatePetWithForm(request: AxiosInstance,  { petId,body,queryParams,requestConfig }: { body?: any,petId: number,queryParams?: admin.UpdatePetWithFormParams,requestConfig?: AxiosRequestConfig }  ) {
    return request<admin.Pet>({
        url: `/pet/${petId}`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Delete a pet.
  */
  export function deletePet(request: AxiosInstance,  { petId,queryParams,requestConfig }: { petId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/pet/${petId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Upload image of the pet.
  */
  export function uploadFile(request: AxiosInstance,  { petId,body,queryParams,requestConfig }: { body?: any,petId: number,queryParams?: admin.UploadFileParams,requestConfig?: AxiosRequestConfig }  ) {
    return request<admin.ApiResponse>({
        url: `/pet/${petId}/uploadImage`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Returns a map of status codes to quantities.
  */
  export function getInventory(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<Record<string, any>>({
        url: `/store/inventory`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Place a new order in the store.
  */
  export function placeOrder(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: admin.Order | admin.Order,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<admin.Order>({
        url: `/store/order`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
  */
  export function getOrderById(request: AxiosInstance,  { orderId,queryParams,requestConfig }: { orderId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<admin.Order>({
        url: `/store/order/${orderId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.
  */
  export function deleteOrder(request: AxiosInstance,  { orderId,queryParams,requestConfig }: { orderId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/store/order/${orderId}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * This can only be done by the logged in user.
  */
  export function createUser(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: admin.User | admin.User,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<admin.User>({
        url: `/user`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Creates list of users with given input array.
  */
  export function createUsersWithListInput(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: Array<admin.User>,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<admin.User>({
        url: `/user/createWithList`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Log into the system.
  */
  export function loginUser(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: admin.LoginUserParams,requestConfig?: AxiosRequestConfig } ) {
    return request<number>({
        url: `/user/login`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Log user out of the system.
  */
  export function logoutUser(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<void>({
        url: `/user/logout`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Get user detail based on username.
  */
  export function getUserByName(request: AxiosInstance,  { username,queryParams,requestConfig }: { username: string,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<admin.User>({
        url: `/user/${username}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * This can only be done by the logged in user.
  */
  export function updateUser(request: AxiosInstance,  { username,body,queryParams,requestConfig }: { body: admin.User | admin.User,username: string,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/user/${username}`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * This can only be done by the logged in user.
  */
  export function deleteUser(request: AxiosInstance,  { username,queryParams,requestConfig }: { username: string,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/user/${username}`,
        method: 'delete'
        ,params: queryParams,
        ...requestConfig
    })
  }


