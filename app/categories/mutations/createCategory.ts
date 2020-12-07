import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateCategoryInput = Pick<Prisma.CategoryCreateArgs, "data">
export default async function createCategory({ data }: CreateCategoryInput, ctx: Ctx) {
  ctx.session.authorize()

  const category = await db.category.create({ data })

  return category
}
