/* eslint-disable */


export interface ApiResponse {
  code?:number;type?:string;message?:string
}

export interface Category {
  id?:number;name?:string
}

export interface Pet {
  id?:number;category?:Category;name:string;photoUrls:Array<string>;tags?:Array<Tag>;status?:'available' | 'pending' | 'sold'
}

export interface Tag {
  id?:number;name?:string
}

export interface Order {
  id?:number;petId?:number;quantity?:number;shipDate?:string;status?:'placed' | 'approved' | 'delivered';complete?:boolean
}

export interface User {
  id?:number;username?:string;firstName?:string;lastName?:string;email?:string;password?:string;phone?:string;userStatus?:number
}

export interface FindPetsByStatusParams {
  status: Array<'available' | 'pending' | 'sold'>;[key: string]: any
}

export interface FindPetsByTagsParams {
  tags: Array<string>;[key: string]: any
}

export interface LoginUserParams {
  username: string;password: string;[key: string]: any
}
