require('dotenv').config();
process.env.NODE_ENV = 'development';

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true, env: process.env };
require('child_process').spawn('npm', args, opts);