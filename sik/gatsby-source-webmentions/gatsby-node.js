const fetch = require("node-fetch")
const API = "https://webmention.io/api"
const POST_NODE_TYPE = "webmention"
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async ({
  actions: {createNode},
  createContentDigest,
  createNodeId,
  cache,
  reporter
}, {
  TOKEN,
  DOMAIN,
  perPage = 10000
}) => {
  if (!TOKEN) return reporter.panic("you must provide token");
  const lastFetched = await cache.get(`timestamp`)
  let url = `${API}/mentions.jf2?domain=${DOMAIN}&token=${TOKEN}&per-page=${perPage}?lastUpdated=${lastFetched}`

  const response = await fetch(url);
  const json = await response.json()
  if(!response.ok) {
    throw {
      statusCode: response.status,
      ...json
    }
  }
  const {children: mentions} = json

  const processMention = async ({...mention}) => ({
    ...mention,
    wm_slug: "/" + mention["wm-target"].replace(/\/+$/, '').split("/").pop() + "/",
    id: createNodeId(mention["wm-id"]),
    internal: {
      type: POST_NODE_TYPE,
      contentDigest: createContentDigest(mention)
    }
  });

  await Promise.all(
    mentions.map(async (mention) => createNode(await processMention(mention)))
  );
};

exports.onCreateNode = async ({
  actions: {createNode},
  node,
  store,
  cache,
  createNodeId,
  reporter
}) => {
  if (node.internal.type === POST_NODE_TYPE && node.author.photo !== null) {
    let pictureNode

    try {
      const { id } = await createRemoteFileNode({
        url: node.author.photo,
        parentNodeId: node.id,
        store,
        cache,
        createNode,
        createNodeId
      });

      pictureNode = id;
    } catch (error) {
      reporter.log(`${POST_NODE_TYPE}: no photo at ${node.author.photo}`)
    }

    node.author.photoSharp___NODE = pictureNode
  }
}

exports.onPostBuild = async ({ cache }) => {
  // set a timestamp at the end of the build
  await cache.set(`timestamp`, Date.now())
}


 