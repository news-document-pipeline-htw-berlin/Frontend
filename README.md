This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Additionally, a Dockerfile is included to run the project without installing dependencies locally.

## Run the project with Docker

Install Docker
Linux: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-engine---community-1
Mac / Windows: https://docs.docker.com/get-started/

Navigate to the project folder.

Create the Docker  image: 
  ### `docker build -t news-app .`

You created an image with the tag news-app. You can now display a list of all images on your system and check if an image tagged news-app is included:
  ### `docker image ls`

Run a Docker container based on the news-app image:
### `docker run -p 3000:80 news-app`

The application is now running on http://localhost:3000.

## Run the project locally without Docker

If you want to run the project locally, you need to install [NodeJs](https://nodejs.org/en/) **>= 8.10**. To install the dependencies and start the app, you can choose between npm and [yarn](https://yarnpkg.com/lang/en/docs/install). Below, all commands are listed with yarn.

First, navigate to the project folder and install the dependencies. Once this is finished, you'll see that a node_modules folder was created. To install the dependencies, run the following command:

### `yarn`

In the project directory, you can then run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
