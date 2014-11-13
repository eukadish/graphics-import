/**
 * Check that formatting object files of some basic shapes is done correctly.
 */
QUnit.test(' Reading the object file.', function(assert){

  assert.deepEqual(
    objectImport('../example/data/tetrahedron.obj').vertices,
      [1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1,
       1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1,
       2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
       ' Checked loading in a tetrahedron.'
	);

  assert.deepEqual(
    objectImport('../example/data/cube.obj').vertices,
        [0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1,
         0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
         0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1,
         0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1,
         0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
         0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
         1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1,
         1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1,
         0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1,
         0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1,
         0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
         0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
         ' Checked loading in a cube.'
  );
});
