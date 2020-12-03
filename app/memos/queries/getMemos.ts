import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetMemosInput = Pick<Prisma.FindManyMemoArgs, "where" | "orderBy" | "skip" | "take">

export default async function getMemos(
  { where, orderBy, skip = 0, take }: GetMemosInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const memos = await db.memo.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.memo.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    memos,
    nextPage,
    hasMore,
    count,
  }
}
