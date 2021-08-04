exports.handler = async (event, context) => {
    console.log('Function ran...');

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
