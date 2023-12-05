import { db } from '.'

type LoginForm = {
    username: string
    //password: string
}

export async function register({ username }: LoginForm) {
    return db.user.create({
        data: { username: username },
    })
}

export async function login({ username }: LoginForm) {
    const user = await db.user.findUnique({ where: { username } })
    if (!user) return null
    /* const isCorrectPassword = password === user.password
    if (!isCorrectPassword) return null */
    return user
}
