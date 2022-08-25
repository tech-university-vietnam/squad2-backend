
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    UNDEFINED = "UNDEFINED"
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

export class User {
    id?: Nullable<number>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    gender?: Nullable<Gender>;
    userId?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
