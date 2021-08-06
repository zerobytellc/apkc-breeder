exports.handler = async (event, context) => {
    console.log('New user login... ' + event.user);

    return {
        statusCode: 200,
    }
}
