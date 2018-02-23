import { app } from './server';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is now listening in on port ${PORT}`);
});
