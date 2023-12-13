import { faker } from "@faker-js/faker";
import { createClient } from "pexels";

const client = createClient(
  "gDCYUY29AVY7Fo2ybuhIZ2EZqUNmC9gtmGHMi23zEXQQ4aAfKutXn1uU"
);

export const generateFakePost = async () => {
  const post = {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    profileImage: faker.image.avatar(),
    isVideo: faker.datatype.boolean(),
    mediaUrl: faker.image.url(), // For images, provide a placeholder image
    caption: faker.lorem.sentence(),
    likes: faker.number.int(1000),
    comments: [],
  };

  // if (post.isVideo) {
  //   post.mediaUrl =
  //     "https://player.vimeo.com/external/357443702.sd.mp4?s=5f664d9471c2e9125a9824ea287a2a2c05ce6f2d&profile_id=139&oauth2_token_id=57447761";
  // }

  const numComments = faker.number.int(10);
  for (let i = 0; i < numComments; i++) {
    post.comments.push({
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      text: faker.lorem.sentence(),
    });
  }

  return post;
};

export const generateFakeFeed = async (page, itemsPerPage) => {
  const feed = [];
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex; i++) {
    const fakePost = await generateFakePost();
    feed.push(fakePost);
  }

  return feed;
};
