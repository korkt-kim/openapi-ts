/* eslint-disable */


export type Order = {id?: number;petId?: number;quantity?: number;shipDate?: string;status?: 'placed' | 'approved' | 'delivered';complete?: boolean}

export type Category = {id?: number;name?: string}

export type User = {id?: number;username?: string;firstName?: string;lastName?: string;email?: string;password?: string;phone?: string;userStatus?: number}

export type Tag = {id?: number;name?: string}

export type Pet = {id?: number;name: string;category?: Category;photoUrls: Array<string>;tags?: Array<Tag>;status?: 'available' | 'pending' | 'sold'}

export type ApiResponse = {code?: number;type?: string;message?: string}
