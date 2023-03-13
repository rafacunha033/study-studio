import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma-client";

export async function appRoutes(app: FastifyInstance) {
    app.post('/playlist', async ( request ) => {
      const createPlaylistBody = z.object({
        name: z.string()
      })

      const { name } = createPlaylistBody.parse(request.body);

      await prisma.playlist.create({
        data: {
          name
        }
      });
    })

    app.get('/playlist', async ( request ) => {
      const getPlaylistParams = z.object({
        name: z.coerce.string()
      });

      const { name } = getPlaylistParams.parse(request.query);

      const playlist = await prisma.playlist.findFirst({
        where: { name: name }
      })

      return {
        playlist
      }
    })
}



