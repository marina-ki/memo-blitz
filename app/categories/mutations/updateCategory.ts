import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateCategoryInput = Pick<Prisma.CategoryUpdateArgs, "where" | "data">

export default async function updateCategory({ where, data }: UpdateCategoryInput, ctx: Ctx) {
  ctx.session.authorize()

  const category = await db.category.update({ where, data })

  return category
}
