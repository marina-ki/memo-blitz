import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetMemoInput = Pick<Prisma.FindFirstMemoArgs, "where">

export default async function getMemo({ where }: GetMemoInput, ctx: Ctx) {
  ctx.session.authorize()

  const memo = await db.memo.findFirst({ where })

  if (!memo) throw new NotFoundError()

  return memo
}
