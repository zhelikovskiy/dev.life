import * as bcrypt from 'bcrypt';

export async function generatePasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}

export async function comparePasswordsHash(
    password1: string,
    password2: string,
): Promise<boolean> {
    return await bcrypt.compare(password1, password2);
}
