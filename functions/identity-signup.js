exports.handler = async (event, context) => {
    const body = JSON.parse(req.body)

    const eventType = body.event
    const user = body.user
    const email = user.email

    let roles = []

    if (eventType === 'signup') {
        roles.push('breeder');

        console.log(`User: ${user.id} signed-up and given roles: ${roles}`)
        console.log(user, `User: ${user.id} details`)

        return {
            statusCode: 200,
            body: JSON.stringify({ app_metadata: { roles: roles } }),
        }
    } else {
        return {
            statusCode: 200,
        }
    }
}
