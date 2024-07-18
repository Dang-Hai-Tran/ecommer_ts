- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)

# Project Setup

## Prerequisites

-   Node.js (version 14 or higher)
-   npm (version 6 or higher)
-   Git

## Steps

1. **Initialize the project**:

    ```bash
    npm init -y
    git init
    touch .gitignore .env tsconfig.json server.ts
    mkdir src docs
    cd src
    mkdir models services controllers utils configs
    touch app.ts
    ```

2. **Configure TypeScript**:
   Create a `tsconfig.json` file with the following content:

    ```json
    {
        "compilerOptions": {
            "module": "NodeNext",
            "esModuleInterop": true,
            "target": "ESNext",
            "moduleResolution": "NodeNext",
            "sourceMap": true,
            "outDir": "./dist",
            "strict": true
        },
        "lib": ["ESNext"]
    }
    ```

3. **Configure .gitignore**:
   Create a `.gitignore` file with the following content:

    ```
    node_modules
    .env
    .DS_Store
    dist
    ```

4. **Install dependencies and dev-dependencies**:

    ```bash
    npm install express morgan helmet compression
    npm install --save-dev typescript ts-node @types/morgan @types/express @types/node @types/compression nodemon
    ```

5. **Configure scripts in `package.json`**:
   Update the `scripts` section in `package.json` with the following:

    ```json
    "scripts": {
        "build": "tsc",
        "start": "node dist/server.js",
        "dev": "nodemon server.ts"
    }
    ```

6. **Create the main application file (`src/app.ts`)**:

    ```typescript
    import { NextFunction } from "connect";
    import express, { Express, Request, Response } from "express";
    import morgan from "morgan";
    import helmet from "helmet";
    import compression from "compression";

    const app: Express = express();
    const port: number = parseInt(process.env.PORT || "3000");

    // Init middlewares
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(compression());

    // Init routes
    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            message: "Welcome",
        });
    });

    export { app, port };
    ```

7. **Create the server file (`server.ts`)**:

    ```typescript
    import { app, port } from "./src/app";

    const server = app.listen(port, "localhost", () => {
        console.log(`Server ecommerce start in port: ${port}.`);
    });

    process.on("SIGINT", () => {
        server.close(() => {
            console.log(`Server closed.`);
        });
    });
    ```

8. **Run the development server**:
    ```bash
    npm run dev
    ```

9. **Install mongoose**
    ```bash
    npm install mongoose
    ```
