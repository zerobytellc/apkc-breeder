const faunadb = require('faunadb')

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
    console.log('Function !! ran...');

    const user = context.clientContext.user
    const email = user.email
    let databaseUser = null;

    await client.query(q.Paginate(q.Match(q.Ref("indexes/users_by_email"), email)))
        .then(async (response) => {
            const results = response.data;
            if ( results.length > 0 ) {
                await client.query(q.Get(q.Match(q.Ref("indexes/users_by_email"), email)))
                    .then((response) => {
                        databaseUser = response.data;
                        console.log( typeof databaseUser );
                    });
            } else {
                console.log( "This must be a new user ... " );
            }
        }, (error) => {
            console.log("uh oh ... " + error);
        })

    combinedUser = {
        ...user,
        ...databaseUser,
    }

    console.log( "Combined user: " + JSON.stringify(combinedUser) );

    if (context.clientContext.user) {
        console.log(context.clientContext.user);
        // return response to browser:
        return {
            statusCode: 200,
            body: JSON.stringify(combinedUser),
        }
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({msg: 'You must be logged in to see this.'}),
        }
    }

}
