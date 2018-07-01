require('dotenv').config();
process.env.NODE_ENV = 'production';

const args = [ 'run', 'build' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true, env: Object.assign({}, process.env, {PUBLIC_URL: '/client'}) };
require('child_process').spawn('npm', args, opts);