QUnit.test("check normal update", function(){	
	deepEqual(testNextGeneration([[0,0,0,0,0], [0,1,1,1,0],[0,1,0,1,0],[0,1,0,1,0],[0,1,1,1,0],[0,0,0,0,0]]), [[0,0,1,0,0],[0,1,0,1,0],[1,1,0,1,1],[1,1,0,1,1],[0,1,0,1,0],[0,0,1,0,0]], "passed");
	deepEqual(testNextGeneration([[0,0,0,0,0], [0,0,1,1,0],[0,0,0,1,0],[0,1,0,1,0],[0,0,0,1,0],[0,0,0,0,0]]), [[0,0,0,0,0],[0,0,1,1,0],[0,0,0,1,1],[0,0,0,1,1],[0,0,1,0,0],[0,0,0,0,0]], "passed");
	deepEqual(testNextGeneration([[0,0,0,0,0], [0,0,1,0,0],[0,0,0,1,0],[0,0,0,1,0],[0,0,1,1,0],[0,0,0,0,0]]), [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,1,0],[0,0,0,1,1],[0,0,1,1,0],[0,0,0,0,0]], "passed");
	deepEqual(testNextGeneration([[0,0,0,0,0], [0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[0,0,0,0,0]]), [[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]], "passed");
	deepEqual(testNextGeneration([[0,0,0,0,0], [0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]), [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], "passed");
});

QUnit.test("check bordering update", function(){	
	deepEqual(testNextGeneration([[1, 0, 1], [0, 1, 0], [1, 0, 1]]), [[0, 0, 0], [0, 0, 0], [0, 0, 0]], 'passed');
	deepEqual(testNextGeneration([[0, 1, 0], [1, 0, 1], [0, 1, 0]]), [[0, 1, 0], [1, 0, 1], [0, 1, 0]], 'passed');
	deepEqual(testNextGeneration([[0, 0, 0], [0, 0, 0], [1, 1, 1]]), [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'passed');
	deepEqual(testNextGeneration([[1, 0, 0], [1, 0, 0], [1, 0, 0]]), [[1, 1, 1], [1, 1, 1], [1, 1, 1]], 'passed');
	deepEqual(testNextGeneration([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), [[1, 1, 1], [1, 1, 1], [1, 1, 1]], "passed");
});

setTimeout('runForeverTest()',500); 

function runForeverTest(){
	width = 24;
	height = 18;
	grid = new Array();
	for (var i = 0; i < height; i++){
		grid[i] = new Array();
		for (var j = 0; j < width; j++){
			grid[i][j] = 0;
		}
	} 
	grid[0][0] = 1;
	grid[1][0] = 1;
	grid[1][2] = 1;
	grid[2][0] = 1;
	grid[2][1] = 1;
    update();
}

