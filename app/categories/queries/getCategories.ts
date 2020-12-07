import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetCategoriesInput = Pick<Prisma.FindManyCategoryArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCategories(
  { where, orderBy, skip = 0, take }: GetCategoriesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const categories = await db.category.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.category.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    categories,
    nextPage,
    hasMore,
    count,
  }
}
