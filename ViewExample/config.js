module.exports = {
    server_port: 3000,
    db_url: 'mongodb+srv://hajin7481:rlagkwls1004@cluster0.z03i3o8.mongodb.net/myuserdb',

    db_schemas: [
        {file: './user_schema', collection: 'users3', schemaName: 'UserSchema', modelName: 'UserModel'}
    ],

    route_info: [
        {file: './user', path: '/process/login', method: 'login', type: 'post'},
        {file: './user', path: '/process/adduser', method: 'adduser', type: 'post'},
        {file: './user', path: '/process/listuser', method: 'listuser', type: 'post'},
    ]
}