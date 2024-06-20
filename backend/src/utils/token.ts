import {sign, verify} from 'hono/jwt';

export async function generateToken(user: any, secret: string) {
    return await sign(user, secret);
}

export async function decodeToken(token: string, secret: string) {
    const user = await verify(token, secret);
    return user;
}