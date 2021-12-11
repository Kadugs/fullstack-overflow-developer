/* eslint-disable no-console */
import app from './app';
import '../setup';

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
