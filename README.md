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
It'd be possible to pick between many such lists to e.g. only use blocks easily availble on survival if I implemented it, but I didn't

Finding the block closest to a given color comes down to finding the square distance between two colors,
which can be calculated from their r, g, b values: d^2 = (r<sub>1</sub>-r<sub>2</sub>)^2+(g<sub>1</sub>-g<sub>2</sub>)^2+(b<sub>1</sub>-b<sub>2</sub>)^2

## what do I do with the generated commands?

minecraft datapacks support putting up to 65536 commands to a .mcfunction file. If you don't know much about creating datapacks,
[here's more details](https://minecraft.fandom.com/wiki/Data_pack) or you can download this [sample data pack](/public/sample_datapack.zip) and put the generated commands to a file in /data/sample_datapack/functions/ and add the datapack to your world.

That's all, here's some screenshots, that bring me joy

<img src="/public/images/globe.png"/>
![image](/public/images/globe.png)
