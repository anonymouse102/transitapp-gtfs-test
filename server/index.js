// This file isn't cross-compiled
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

const stopsFile = './public/stops.txt';
const stopsJson = './public/stops.json';

// Opening up for cors, definitely don't use on production
if (process.env.NODE_ENV != 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// Parse the stop file, save to json file
const parseStops = function () {
  return new Promise((resolve, reject) => {
    fs.open(stopsFile, 'r', (err, fd) => {
      if (err) {
        reject(err);
        return;
      }
      const readStream = fs.createReadStream(stopsFile, { fd });
      const chunks = [];

      // It would be better to read and parse line by line
      // and push a json array into a file line by line
      // this would lighten the server load if the source is huuuge
      readStream.on('data', chunk => {
        chunks.push(chunk);
      });

      readStream.on('close', () => {
        let [header, ...lines] = Buffer.concat(chunks).toString()
          .split('\n')
          .map(line => line
            // clean \r from lines with regex
            .replace(/\r$/, '')
            // split at comma, only if it's unescaped.
            // i'm pretty sure this works (?) untested
            .split(/(?<!\\),/)
          );

        const object = lines.map(line => {
          const newline = {};
          for (let i in line) {
            const key = header[i];
            newline[key]= line[i];
          }
          return newline;
        });

        fs.writeFile(stopsJson, JSON.stringify(object), (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(object);
          return;
        });
      });
    });
  });
};

// API endpoint to refresh the data
app.get('/refreshData', async (req, res) => {
  try {
    await parseStops();
    res.send({ success: 'Parsed some data.' });
  } catch (e) {
    res.send({ error: e.message });
  }
});

// Parse stops file (if necessary), then pipe it out
// TODO we need to filter by "bounds", so we don't send ALL the stop to the client
app.get('/stops', async (req, res) => {
  try {
    if (!fs.existsSync(stopsJson)) {
      const result = await parseStops();
    }
  } catch (e) {
    res.send({ error: e.message });
    return;
  }

  // TODO once we know what we want on the front-end,
  // we can clean up which fields actually need to be returned
  fs.createReadStream(stopsJson).pipe(res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
