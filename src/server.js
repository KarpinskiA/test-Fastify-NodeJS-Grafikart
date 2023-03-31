import fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import fastifyFormbody from "@fastify/formbody";
import fastifySecureSession from "@fastify/secure-session";
import ejs from "ejs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { RecordNotFoundError } from "./errors/RecordNotFoundError.js";
import { NotAuthenticatedError } from "./errors/NotAuthenticatedError.js";
import { createPost, listPosts, showPost } from "./actions/posts.js";
import { loginAction, logoutAction } from "./actions/auth.js";

const app = fastify();
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

// moteur de templating
app.register(fastifyView, {
  engine: {
    ejs,
  }
})
// gère les cookies d'authentification
app.register(fastifySecureSession, {
  // the name of the session cookie, defaults to 'session'
  cookieName: 'session',
  // adapt this to point to the directory where secret-key is located
  key: readFileSync(join(rootDir, 'secret-key')),
  cookie: {
    path: '/'
  }
})
// gère les formulaires
app.register(fastifyFormbody);
// permet d'accéder au dossier public et donc d'utiliser le css
app.register(fastifyStatic, {
  root: join(rootDir, 'public'),
});

// Route API
app.get('/', listPosts);
app.post('/', createPost);
app.get('/login', loginAction);
app.post('/login', loginAction);
app.post('/logout', logoutAction);
app.get('/article/:id', showPost);
app.setErrorHandler((error, req, res) =>{
  if (error instanceof RecordNotFoundError) {
    res.statusCode = 404;
    return res.view('templates/404.ejs', {
      error: 'Cet enregistrement n\'existe pas',
    });
  } else if (error instanceof NotAuthenticatedError){
    return res.redirect('/login')
  }
  console.error(error);
  res.statusCode = 500;
  return {
    error: error.message,
  }
});

const start = async () => {
  try {
    await app.listen({port: 3000});
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();