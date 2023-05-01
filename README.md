<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

# A thing that makes images and 3d objects into minecraft commands

## 3d objects

### wireframe

Thanks to newly added to minecraft display entities it's possible to display arbitrary lines,
and I thought It'd be cool if you could display a 3d object's wireframe with them,
so I made this.

I think the UI for this one is quite self explainatory, except for maybe the tag.
When you generate something from many display entities, each of them is assigned two tags:

- the one you input
- a unique number

For the entity to be transformed correctly it must have a unique combination of those two,
so if you want to add multiple wireframes in a single world, they must have different tags.
The tag you input can then later be used to select all entities from a single wireframe with @e\[tag= {...}\]
For example if you want to teleport the wireframe to where you're standing, run `/tp @e[tag=YOUR_TAG] @s`

### voxelization

Voxelization means converting a 3d mesh made out of triangles into a grid of _voxels_ - 3d equivalent of a pixel.
In this case it means taking a 3d mesh, doing some weird math and spitting out a minecraft build.

In short, the voxelization algorithm used here works like this:

- shoot a lot of rays at the object (in the positive z direction)
- compute, where they intersect the object by [computing where they intersect all its triangles](https://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm)
- if the ray intersected the object even number of times, its origin is outside the object, otherwise the origin is inside the object (or the mesh isn't fully closed, or some vertex aligned with the ray in a very unfortunate way)
- based on the amount and position of the intersections, it can be deduced, which voxels are contained in the mesh and should be filled.
- if not specified otherwise, all the voxels not exposed to the surface can be cleared.
- each filled voxel is then converted into a command, setting the corresponding block to the one you specified.

Here's a cool 2d visualisation of the algorithm, it also shows the role of all the things, that you input in the UI:

<img src="/public/images/voxelization.png"/>

If you still don't get how it works, I guess just play with the input values, until something cool comes out or your browser crashes.

#### coloring

If the 3d object you provided includes [uv coordinates](https://en.wikipedia.org/wiki/UV_mapping) a texture can be aplied to it.
The way it works is

- for each filled voxel calculate the closest point on the mesh.
- sample the color of that point from the provided texture and assign it to the voxel.
- find the block corresponding to that color

Note: some 3d models are made of multiple materials and use many different textures. You can only apply one texture here because ~~I'm lazy~~ that info isn't included in the .obj file.

## images

If you take each block's texture file and compute it's average color, you can assign a color to every block in mineraft.
Some blocks use multiple textures, and can be rotated in many ways, so I discarded them to avoid dealing with that.
I also discarded:

- blocks that are transparent
- blocks that fall when placed in the air
- blocks that glow
- coral blocks (they dry without water)

Full list of everything that's left, and their corresponding colors can be viewed [here](/public/bclists/blockcolors.txt)
