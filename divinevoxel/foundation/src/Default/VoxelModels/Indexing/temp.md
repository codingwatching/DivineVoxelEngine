
# build face cull index 
- index made of 16 bit ints. One int for each face of the geometry. 
- each int is an index of the face of the other geometry that occuldes it
# build face transparent index 
- index made of an bit array. One int for each face
- index calculated by the mod x state of the voxel
- each bit will determine if the face is transparent or not
# determine if face is culled or not
- get the voxel and the face index of the potential occulding face
- get the voxels shape state and mod state
- indexing the transparent array and see if the face is see transparent or not
- if it is do not cull and keep the face otherwise discard it


## gometry transparent face index
- for each voxel model map each shape state geometry to a palette relative to the state. 
- then map the face indexes relative to that palette. 
- So that you can take the shape state and geometry id and get back a single starting face index

## voxel transparent face index
- for each voxel create a index of the shape state and mod state
- the index should have a starting index to tell how which byte index it is in for each mod state

