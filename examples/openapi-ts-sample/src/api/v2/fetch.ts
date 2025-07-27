/* eslint-disable */
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as console from './scheme'

  /**
  * 
  */
  export function uploadFile(request: AxiosInstance,  { petId,body,queryParams,requestConfig }: { body: FormData,petId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.ApiResponse>({
        url: `/pet/${petId}/uploadImage`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function addPet(request: AxiosInstance,  { body,queryParams,requestConfig }: { body?: any,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/pet`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePet(request: AxiosInstance,  { body,queryParams,requestConfig }: { body?: any,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/pet`,
        method: 'put'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Multiple status values can be provided with comma separated strings
  */
  export function findPetsByStatus(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.FindPetsByStatusParams,requestConfig?: AxiosRequestConfig } ) {
    return request<Array<console.Pet>>({
        url: `/pet/findByStatus`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
  */
  export function findPetsByTags(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.FindPetsByTagsParams,requestConfig?: AxiosRequestConfig } ) {
    return request<Array<console.Pet>>({
        url: `/pet/findByTags`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * Returns a single pet
  */
  export function getPetById(request: AxiosInstance,  { petId,queryParams,requestConfig }: { petId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.Pet>({
        url: `/pet/${petId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function updatePetWithForm(request: AxiosInstance,  { petId,body,queryParams,requestConfig }: { body: {name?: string;status?: string},petId: number,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/pet/${petId}`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
        ,headers: {'Content-Type': 'application/x-www-form-urlencoded', ...requestConfig?.headers}
    })
  }

  /**
  * 
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
  * Returns a map of status codes to quantities
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
  * 
  */
  export function placeOrder(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.Order,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<console.Order>({
        url: `/store/order`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
  */
  export function getOrderById(request: AxiosInstance,  { orderId,queryParams,requestConfig }: { orderId: number,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.Order>({
        url: `/store/order/${orderId}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
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
  * 
  */
  export function createUsersWithListInput(request: AxiosInstance,  { body,queryParams,requestConfig }: { body?: any,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/user/createWithList`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
  */
  export function getUserByName(request: AxiosInstance,  { username,queryParams,requestConfig }: { username: string,queryParams?: any,requestConfig?: AxiosRequestConfig } ) {
    return request<console.User>({
        url: `/user/${username}`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * This can only be done by the logged in user.
  */
  export function updateUser(request: AxiosInstance,  { username,body,queryParams,requestConfig }: { body: console.User,username: string,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
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

  /**
  * 
  */
  export function loginUser(request: AxiosInstance,  { queryParams,requestConfig }: { queryParams: console.LoginUserParams,requestConfig?: AxiosRequestConfig } ) {
    return request<string>({
        url: `/user/login`,
        method: 'get',
        params: queryParams,
        ...requestConfig
    })
  }

  /**
  * 
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
  * 
  */
  export function createUsersWithArrayInput(request: AxiosInstance,  { body,queryParams,requestConfig }: { body?: any,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/user/createWithArray`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }

  /**
  * This can only be done by the logged in user.
  */
  export function createUser(request: AxiosInstance,  { body,queryParams,requestConfig }: { body: console.User,queryParams?: any,requestConfig?: AxiosRequestConfig }  ) {
    return request<void>({
        url: `/user`,
        method: 'post'
        ,data: body
        ,params: queryParams,
        ...requestConfig
    })
  }


