import { app } from './server';

app.listen(process.env.PORT, () => {
  console.log(`Server is now listening in on port ${PORT}`);
});
