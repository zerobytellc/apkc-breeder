const faunadb = require('faunadb')

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
    console.log('Function !! ran...');
    client.query(q.Paginate(q.Match(q.Ref("indexes/all_users"))))
        .then((response) => {
            console.log( "All Users: " + response.data );
        }, (error) => {console.log( "uh oh ... " + error );})

    const data = { name: 'mario', age: 35, job: 'plumber' };

    if (context.clientContext.user) {
        // return response to browser:
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({msg: 'You must be logged in to see this.' } ),
        }
    }

}
