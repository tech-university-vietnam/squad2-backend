
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum HotelStatus {
    INVALID = "INVALID",
    AVAILABLE = "AVAILABLE",
    UNAVAILABLE = "UNAVAILABLE"
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    UNDEFINED = "UNDEFINED"
}

export class CreateHotelInput {
    name?: Nullable<string>;
    address?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    phone?: Nullable<string>;
    email?: Nullable<string>;
    price?: Nullable<number>;
    facilities?: Nullable<Nullable<string>[]>;
    status?: Nullable<HotelStatus>;
    description?: Nullable<string>;
}

export class UpdateHotelInput {
    id: number;
    name?: Nullable<string>;
    address?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    phone?: Nullable<string>;
    email?: Nullable<string>;
    price?: Nullable<number>;
    facilities?: Nullable<Nullable<string>[]>;
    status?: Nullable<HotelStatus>;
    description?: Nullable<string>;
}

export class CreateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    gender?: Nullable<Gender>;
    userId?: Nullable<string>;
}

export class UpdateUserInput {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    gender?: Nullable<Gender>;
    userId?: Nullable<string>;
}

export class Hotel {
    id?: Nullable<number>;
    name?: Nullable<string>;
    address?: Nullable<string>;
    images?: Nullable<Nullable<string>[]>;
    phone?: Nullable<string>;
    email?: Nullable<string>;
    price?: Nullable<number>;
    facilities?: Nullable<Nullable<string>[]>;
    status?: Nullable<HotelStatus>;
    description?: Nullable<string>;
}

export abstract class IQuery {
    abstract hotels(): Nullable<Hotel>[] | Promise<Nullable<Hotel>[]>;

    abstract hotel(id: number): Nullable<Hotel> | Promise<Nullable<Hotel>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createHotel(createHotelInput: CreateHotelInput): Hotel | Promise<Hotel>;

    abstract updateHotel(updateHotelInput: UpdateHotelInput): Hotel | Promise<Hotel>;

    abstract removeHotel(id: number): Nullable<Hotel> | Promise<Nullable<Hotel>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id?: Nullable<number>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    gender?: Nullable<Gender>;
    userId?: Nullable<string>;
}

type Nullable<T> = T | null;
