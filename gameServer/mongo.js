import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = `mongodb+srv://mobsters:${process.env.MONGO_PASS}@cluster0.3c4ob.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const getOneGame = async id => {
  try {
    await client.connect();
    let game = await client.db("GameHub").collection("games").findOne({ id });
    console.log(game);
    await client.close();
    if (!game) {
      // api call
      game = {
        name: 'Witcher',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        year: 2017,
        genre: [ 'Adventure' ],
        rating: [ '4.9' ],
        image: [ 'https://i1.sndcdn.com/artworks-Mnckgkyr334C1360-ZmjZQg-t500x500.jpg' ],
        platforms: [ 'PS4', 'PC', 'PS3' ],
        mainStory: 78,
        extras: 160,
        total: 198,
        id: 467
      };
      const inserted = await createGame(game);
    }
    return game;
  } catch (err) {
    console.log(err);
  } 
};

const createGame = async game => {
  await client.connect();
  await client.db("GameHub").collection("games").insertOne(game);
  await client.close();
};

// async function createListing(client, newListing){
//   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
//   console.log(`New listing created with the following id: ${result.insertedId}`);
// }

// await createListing(client,
//   {
//       name: "Lovely Loft",
//       summary: "A charming loft in Paris",
//       bedrooms: 1,
//       bathrooms: 1
//   }
// );

getOneGame(467).catch(console.error)
