import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345',10),
        isAdmin:true
    },
    {
        name: 'hisham',
        email: 'hisham@example.com',
        password: bcrypt.hashSync('12345',10),
    },
    {
        name: 'nader',
        email: 'nader@example.com',
        password: bcrypt.hashSync('12345',10),
    },
]

export default users