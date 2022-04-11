const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';

if (!isDev && cluster.isMaster)
{
    console.error(`Node cluster master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++)
    {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) =>
    {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
} else
{
    const app = express();
    const morgan = require('morgan');
    const path = require('path');

    const PORT = process.env.PORT || 5000;


    app.use(morgan('dev'));

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    const routes = require('./routes/route');

    app.use('/', routes);

    app.listen(PORT, () =>
    {
        console.error(`Node ${isDev ? 'dev server' : 'cluster' + process.pid} server is running on port ${PORT}`);
    });
}