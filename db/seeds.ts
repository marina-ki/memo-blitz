import db from "./index"
import { hashPassword } from "app/auth/auth-utils"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  const hashedPassword = await hashPassword("password!!")
  const email = "hoge@example.com".toLowerCase()
  const userId = (
    await db.user.create({
      data: { email, hashedPassword, role: "user" },
      select: { id: true, name: true, email: true, role: true },
    })
  ).id

  await db.category.create({
    data: {
      name: "カテゴリー１",
      memos: {
        create: [
          {
            title: "メモ１",
            body: "メモの１つ目です。",
            user: { connect: { id: userId } },
          },
          {
            title: "メモ２",
            body: "メモの２つ目です。",
            user: { connect: { id: userId } },
          },
        ],
      },
      user: { connect: { id: userId } },
    },
  })

  await db.category.create({
    data: {
      name: "カテゴリー２",
      memos: {
        create: [
          {
            title: "メモ３",
            body: "メモの３つ目です。",
            user: { connect: { id: userId } },
          },
        ],
      },
      user: { connect: { id: userId } },
    },
  })
}

export default seed
