
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

export class CreateBookingInput {
    id?: Nullable<number>;
    checkIn?: Nullable<string>;
    checkOut?: Nullable<string>;
    hotelId?: Nullable<number>;
    userId?: Nullable<number>;
    guests?: Nullable<number>;
}

export class UpdateBookingInput {
    id: number;
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

export class PaginationInput {
    limit?: Nullable<number>;
    page?: Nullable<number>;
}

export class ListHotelsInput {
    paging?: Nullable<PaginationInput>;
    orderBy?: Nullable<string>;
    address?: Nullable<string>;
    name?: Nullable<string>;
}

export class CreateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    gender?: Nullable<Gender>;
    userId?: Nullable<string>;
    dob?: Nullable<Date>;
}

export class UpdateUserInput {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    gender?: Nullable<Gender>;
    userId?: Nullable<string>;
    dob?: Nullable<Date>;
}

export class Booking {
    id?: Nullable<number>;
    checkIn?: Nullable<string>;
    checkOut?: Nullable<string>;
    hotel?: Nullable<Hotel>;
    user?: Nullable<User>;
    createdAt?: Nullable<string>;
    totalPrice?: Nullable<number>;
    guests: number;
}

export abstract class IQuery {
    abstract bookings(): Nullable<Booking>[] | Promise<Nullable<Booking>[]>;

    abstract booking(id: number): Nullable<Booking> | Promise<Nullable<Booking>>;

    abstract hotels(listHotelsInput?: Nullable<ListHotelsInput>): PaginationHotels | Promise<PaginationHotels>;

    abstract hotel(id: number): Nullable<Hotel> | Promise<Nullable<Hotel>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract currentUser(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createBooking(createBookingInput: CreateBookingInput): Booking | Promise<Booking>;

    abstract updateBooking(updateBookingInput: UpdateBookingInput): Booking | Promise<Booking>;

    abstract removeBooking(id: number): Nullable<Booking> | Promise<Nullable<Booking>>;

    abstract createHotel(createHotelInput: CreateHotelInput): Hotel | Promise<Hotel>;

    abstract updateHotel(updateHotelInput: UpdateHotelInput): Hotel | Promise<Hotel>;

    abstract removeHotel(id: number): Nullable<Hotel> | Promise<Nullable<Hotel>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
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

export class Meta {
    itemCount?: Nullable<number>;
    totalItems?: Nullable<number>;
    itemsPerPage?: Nullable<number>;
    totalPages?: Nullable<number>;
    currentPage?: Nullable<number>;
}

export class Links {
    first?: Nullable<string>;
    last?: Nullable<string>;
    prev?: Nullable<string>;
    next?: Nullable<string>;
}

export class PaginationHotels {
    meta?: Nullable<Meta>;
    items?: Nullable<Nullable<Hotel>[]>;
    links?: Nullable<Links>;
}

export class User {
    id?: Nullable<number>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    gender?: Nullable<Gender>;
    userId?: Nullable<string>;
    dob?: Nullable<Date>;
    bookings?: Nullable<Nullable<Booking>[]>;
}

type Nullable<T> = T | null;
