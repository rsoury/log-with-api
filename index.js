import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import util from 'util';
import colors from 'colors';

const port = 6622;
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('/', (req, res, next) => {
	const { log = {} } = req.body;
	console.log(util.inspect(log, { showHidden: false, depth: null }));
	res.end();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // logger.debug(error instanceof Error);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(
    {
      object: "error",
      type: err.status,
      message: err.message,
      trace: err
    }
  );
});

app.listen(port, () => {
  console.log(`We are live on ${port}`.green);
});

export default app;