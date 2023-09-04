export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('Server-side Team: ', body);

    const selectedTeam = body;

    try {
        await selectedTeam.delete();
    } catch (e: any) {
        throw createError({
            message: e.message,
        })
    }
})