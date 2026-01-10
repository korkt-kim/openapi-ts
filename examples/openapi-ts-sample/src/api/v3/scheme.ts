/* eslint-disable */


export interface Order {
  id?:number;petId?:number;quantity?:number;shipDate?:string;status?:'placed' | 'approved' | 'delivered';complete?:boolean
}

export interface Category {
  id?:number;name?:string
}

export interface User {
  id?:number;username?:string;firstName?:string;lastName?:string;email?:string;password?:string;phone?:string;userStatus?:number
}

export interface Tag {
  id?:number;name?:string
}

export interface Pet {
  id?:number;name:string;category?:Category;photoUrls:Array<string>;tags?:Array<Tag>;status?:'available' | 'pending' | 'sold'
}

export interface ApiResponse {
  code?:number;type?:string;message?:string
}

export interface FindPetsByStatusParams {
  status: 'available' | 'pending' | 'sold';[key: string]: any
}

export interface FindPetsByTagsParams {
  tags: Array<string>;[key: string]: any
}

export interface UpdatePetWithFormParams {
  name?: string;status?: string;[key: string]: any
}

export interface UploadFileParams {
  additionalMetadata?: string;[key: string]: any
}

export interface LoginUserParams {
  username?: string;password?: string;[key: string]: any
}
