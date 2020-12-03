import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateMemoInput = Pick<Prisma.MemoCreateArgs, "data">
export default async function createMemo({ data }: CreateMemoInput, ctx: Ctx) {
  ctx.session.authorize()

  const memo = await db.memo.create({ data })

  return memo
}
