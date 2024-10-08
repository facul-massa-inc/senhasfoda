import commonPasswords from "$lib/assets/common-passwords.txt?raw"

const commonPasswordList = commonPasswords.split("\n").map(p => p.trim());

export async function POST({ request }) {
    return new Response(commonPasswordList.includes(await request.text()).toString(), { status: 200 });
}