import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateMemoInput = Pick<Prisma.MemoUpdateArgs, "where" | "data">

export default async function updateMemo({ where, data }: UpdateMemoInput, ctx: Ctx) {
  ctx.session.authorize()

  const memo = await db.memo.update({ where, data })

  return memo
}
