exports.handler = async () => {
    console.log('Function ran...');

    const data = { name: 'mario', age: 35, job: 'plumber' };

    // return response to browser:
    return {
        status: 200,
        body: JSON.stringify(data),
    }
}
