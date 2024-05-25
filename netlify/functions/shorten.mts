import type { Config } from "@netlify/functions";
import shortid from "shortid";
import { getStore } from "@netlify/blobs";

export default async (req: Request) => {
  if (req.method === "POST") {
    const data = await req.json();
    if (data.code) {
      // Store the data in the blob store
      const shortenStore = getStore("shorten");
      const id = shortid();
      await shortenStore.set(id, data.code);

      return new Response(JSON.stringify({ id }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({
        message: "Nice to meet you!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const id = req.url.split("/").pop();

  if (id && req.method === "GET") {
    const shortenStore = getStore("shorten");
    const code = await shortenStore.get(id);
    if (code) {
      return new Response(JSON.stringify({ code }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new Response("Hello, world!");
};

export const config: Config = {
  path: ["/shorten/*", "/shorten"],
};
