require('dotenv').config();

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true, NODE_ENV: process.env.NODE_ENV };
require('child_process').spawn('npm', args, opts);