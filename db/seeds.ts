import db from "./index"
import { hashPassword } from "app/auth/auth-utils"
import { SignupInput, SignupInputType } from "app/auth/validations"
import { User } from "@prisma/client"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  /*
  user
  */
  const hashedPassword = await hashPassword("password!!")
  const email = "hoge@example.com".toLowerCase()
  let userId = (await db.user.findFirst({ where: { email } }))?.id
  if (!userId) {
    userId = (
      await db.user.create({
        data: { email, hashedPassword, role: "user" },
        select: { id: true, name: true, email: true, role: true },
      })
    ).id
  }

  /*
  category, memo
  */
  await db.category.create({
    data: {
      name: "React",
      memos: {
        create: [
          {
            title: "Tutorial",
            body:
              "We will build a small game during this tutorial. You might be tempted to skip it because you’re not building games — but give it a chance. The techniques you’ll learn in the tutorial are fundamental to building any React app, and mastering it will give you a deep understanding of React.",
            user: { connect: { id: userId } },
          },
          {
            title: "React Hooks",
            body:
              "Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.",
            user: { connect: { id: userId } },
          },
        ],
      },
      user: { connect: { id: userId } },
    },
  })

  await db.category.create({
    data: {
      name: "Blitz.js",
      memos: {
        create: [
          {
            title: "API Not Required",
            body:
              "Instead of fetching data from the backend, you import your server code into your frontend and call it like a normal function. At build time, the direct function import is swapped out with an auto generated HTTP API.",
            user: { connect: { id: userId } },
          },
          {
            title: "Fullstack & Monolithic",
            body:
              "Includes everything from the database to your frontend all inside a single app. Only one development server. Only one thing to deploy.",
            user: { connect: { id: userId } },
          },
        ],
      },
      user: { connect: { id: userId } },
    },
  })
}

export default seed
