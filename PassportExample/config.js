module.exports = {
	server_port: 3000,
	db_url: 'mongodb://127.0.0.1:27017/local',
	db_schemas: [
		{file:'./user_schema', collection:'users5', schemaName:'UserSchema', modelName:'UserModel'}
	],
	route_info: [
	]
}