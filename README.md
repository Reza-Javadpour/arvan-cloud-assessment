# Arvan Cloud Front-end Assessment
This project was implemented using the [RealWorld](https://realworld.io) open API.
## Technologies:

**Framework:** Vuejs `version 3.2.37` - [docs](https://vuejs.org)

**Build Tool:** Vite `version 3.0.7` - [docs](https://vitejs.dev/)

## Commands:

**Install node packages:**
```
npm install
```

**Run project:**
```
npm run dev
```

**Build project:**
```
npm run build
```

## Files Structure:

```
├── public                    Public folder for place public files (favicon.ico & ...)  
├── src                       Contains source codes
│  ├── main.js                vue main file
│  ├── app.vue                Vue.js app root file
│  ├── assets                 Contains all assets that uses in the entire project
│  │  └── styles              Contains all style sheets
│  ├── components             Contains all UI components
│  ├── core                   Contains utils, interceptor, APIs & ...
│  ├── layout                 Contains project layouts & its partials
│  ├── router                 Contains all vue routes
│  └── views                  Contains all pages (Articles, NewArticle, EditArticle, ...)
├── index.html                Main index file
├── package.json              npm packages list
├── README.md                 This Document that you are reading
├── vite.config.js            Vite build tool configs
├── vitest.config.js          Vitest config file
```
