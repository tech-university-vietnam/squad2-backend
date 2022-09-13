/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const query = `mutation CreateHotel($createHotelInput: CreateHotelInput!) {
  createHotel(createHotelInput: $createHotelInput) {
    id
  }
}`;

const dump = async () => {
  const hotelsData = await fs.readFile('./hotelWithDumpDesc.json', 'utf8');
  const hotels = JSON.parse(hotelsData);
  await Promise.all(
    hotels.map(async (hotel) => {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { createHotelInput: hotel },
        }),
      });
      const data = await res.json();
      console.log('data returned:', data);
    }),
  );

  const userQuery = `mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id}
  }`;
  const firstName = ['John', 'Jane', 'Bob', 'Alice', 'Tom', 'Jerry'];
  const lastName = ['Doe', 'Smith', 'Brown', 'White', 'Black', 'Green'];

  await Promise.all(
    Array.from(Array(10)).map(async () => {
      const user = {
        firstName: firstName[Math.floor(Math.random() * firstName.length)],
        lastName: lastName[Math.floor(Math.random() * lastName.length)],
        email: `${firstName[Math.floor(Math.random() * firstName.length)]}.${
          lastName[Math.floor(Math.random() * lastName.length)]
        }@gmail.com`,
      };
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: userQuery,
          variables: { createUserInput: user },
        }),
      });
      const data = await res.json();
      console.log('data returned:', data);
    }),
  );

  await Promise.all(
    Array.from(Array(15)).map(async (_, id) => {
      const hotelId = id + 1;
      Array.from(Array(Math.floor(Math.random() * 5) + 5)).forEach(async () => {
        const review = {
          content: 'I had a great time here',
          point: Math.floor(Math.random() * 5) + 1,
          hotelId,
          userId: Math.floor(Math.random() * 10) + 1,
        };
        const res = await fetch('http://localhost:8000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: `mutation CreateReview($createReviewInput: CreateReviewInput!) {
          createReview(createReviewInput: $createReviewInput) {
            id
          }
        }`,
            variables: { createReviewInput: review },
          }),
        });
        const data = await res.json();
        console.log('data returned:', data);
      });
    }),
  );
};

dump();
