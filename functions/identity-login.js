const faunadb = require('faunadb')

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = async (req, context) => {
    const body = JSON.parse(req.body)

    const eventType = body.event
    const user = body.user
    const email = user.email
    let databaseUser = null

    await client.query(q.Paginate(q.Match(q.Ref("indexes/users_by_email"), email)))
        .then(async (response) => {
            const results = response.data;
            if ( results.length > 0 ) {
                console.log( "Existing user" );
                await client.query(q.Get(q.Match(q.Ref("indexes/users_by_email"), email)))
                    .then((response) => {
                        databaseUser = response.data;
                    });
            } else {
                console.log( "This must be a new user ... let's create the entry" );

                const userItem = {
                    data: user
                }
                databaseUser = {
                    ...userItem,
                    ...{
                        approved: false
                    },
                }
                console.log( "Creating userItem: " + databaseUser );
                await client.query(q.Create(q.Ref("classes/users"), databaseUser))
                    .then((response) => {
                        console.log( "Successfully created the new user... " );
                    })
            }
            console.log("Database User Entry: " + JSON.stringify(results));
        }, (error) => {
            console.log("uh oh ... " + error);
        })

    console.log(user, `${user.id} details`);
    if ( context.ClientContext && context.ClientContext.user )
        console.log('UserContext: ' + context.ClientContext.user)

    let roles = [];
    if ( user.app_metadata.roles ) {
        roles.push(user.app_metadata.roles);
    }

    if (eventType === 'login') {
        if ( user.app_metadata.roles.includes("breeder") ) {
            console.log( `User ${user.id} logged in and already had role 'breeder'` );
        } else {
            user.app_metadata.roles.push('breeder');
            console.log( `User: ${user.id} logged in and granted role 'breeder'` );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ app_metadata: { roles: user.app_metadata.roles } }),
        }
    } else {
        return {
            statusCode: 200,
        }
    }
}
