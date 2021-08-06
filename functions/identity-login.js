exports.handler = async (req, context) => {
    const body = JSON.parse(req.body)

    const eventType = body.event
    const user = body.user
    const email = user.email

    console.log('User details: ' + user);
    if ( context.ClientContext && context.ClientContext.user )
        console.log('UserContext: ' + context.ClientContext.user)

    let roles = [];
    if ( user.app_metadata.roles ) {
        roles.push(user.app_metadata.roles);
    }

    if (eventType === 'login') {
        if ( roles.includes("breeder") ) {
            console.log( `User ${user.id} logged in and already had role 'breeder'` );
        } else {
            roles.push('breeder');
            console.log( `User: ${user.id} logged in and granted role 'breeder'` );
        }

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
