const faunadb = require('faunadb')

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
    console.log('Function !! ran...');

    const user = context.clientContext.user
    let authorized = false;
    let databaseUser = null;

    if (user) {
        const email = user.email
        await client.query(q.Get(q.Match(q.Ref("indexes/users_by_email"), email)))
            .then((response) => {
                databaseUser = response.data;
            });

        authorized = (databaseUser && databaseUser.approved)
    }

    if ( authorized ) {
        // return response to browser:
        console.log( "YAY!") ;
        return {
            statusCode: 200,
            body: JSON.stringify(databaseUser),
        }
    } else {
        console.log( "BOO!" );
        return {
            statusCode: 401,
            body: JSON.stringify({msg: 'You must be logged in to see this.'}),
        }
    }

}
