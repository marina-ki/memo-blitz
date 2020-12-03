import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteMemoInput = Pick<Prisma.MemoDeleteArgs, "where">

export default async function deleteMemo({ where }: DeleteMemoInput, ctx: Ctx) {
  ctx.session.authorize()

  const memo = await db.memo.delete({ where })

  return memo
}
