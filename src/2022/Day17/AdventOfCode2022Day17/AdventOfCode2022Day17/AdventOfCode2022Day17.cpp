#include <iostream>
#include <chrono>
#include <vector>
#include <thread>
#include <numeric>
#include <bitset>

const int NR_OF_ROWS = 100;
const int NR_OF_COLUMNS = 7;

const int DATA_LENGTH_E = 40;
const int DATA_LENGTH_R = 10091;

std::bitset<DATA_LENGTH_E> dataBitsetE(std::string("1110010110001101110001110001000110110011"));
std::bitset<DATA_LENGTH_R> dataBitsetR(std::string("11100111010011110001101110000111100100111000010111100001110011011000111101000111100110011100011100111101111000111100001011110000110000111011011110111101000111100001111001111000011100011100001001100010001111011011110000110111001110010011110000111001110111011110000110001100001111001110010011001101100111101000011110010110100110000110000111000011110111010001111000011001100001111000011101111000100100110100111011110011100001000101110110001110001111000111001111000110000111100011100010000100011101101111000010011100001110010000100011001101100001110001110000100111000010001000011100001111001110010000111100111001000100110000100011100001111001100001101101101110100011001101110110001011110111001011100111101111011001111011000010000111000011001110111000010000111100001100001111000011000100011100100111101100001110011110001100011110011001000011110100001111010011000011100111100001111010110001110000100011001111000111000011110111011100111100011110001110011110011001110110001110001111000110000100011100011100110001100001110011110000111101110110001100010000101100001110000101111000110001000010000111100001100011000100110001110000100111100111001111011110001110001100001100010110100001110111100110000110111100011001011110000110111100111000011011101111011100010001110010011110000101000011000111000100110011000010011100110000100110001101110110000110001100011110001111000011110110100011110001000111001110011000111011110001011100101111011011000011110011011110011101110011101111000110011110001111001000011101110111000111001110000111000110111000111101111011000011101110111011100001110010001100011100001110001000111011010110011100001111000111000100011110001110000111000011100001111011100100110011100001110011000011110001011110001111000110011001001111000011001100001000010000111100111100011101000011101110011110001111000110111100001111000100011110010000111100111100110010000100110010000111101100011110100111101111011100001100100011001111010010011101100010001100001100111000100001111011110110111100011001000010111100110001110001110001100001010001110000110001111010011110011000111000010000101100110100100111100011010010110000101101101110001100011110011001100001101111000011011110000111010001110011000111000010001110011110001110111100001110101101010001111011110001110100100111100001110110000111101111011011100001110011101110010001011001001111000011001100001110001001001110000111100001110011110001110000111100001111000011000111000011100011100011000111100001111011101111000111000110001001011110010011000011101000010011110010001110011000010111001110001111001000111100100111101011110011101100110011001000011110001011000010000110011000111001001000011110001000011110001100111100011001101101000111100100001111000111000111011100011100011100010011100111000010001100011100001110000110001111011000111100110010011110001001110010001000010111100111100001101100001110000110110000101001110100110000110111011100001111000010011010001101000011101111000111101101111000111100111000011100101110000100011110011000010001100111100101001100011110001100100011100111011101111001110000110001001110001001110111000011000111001100001100100111001100010111101100010111001111001101000010001000100011100011100001100010101100011110011100011001110101110110111100110011100100011100011110001100011110110010100100001100001100111000101110001000011100010001111001100001100010011110011000011001100111000011001101000100011000010011011110001110111000111100111101111000011110111101110001111001100010100010001111000111100001100011110001111000110100001111011100001111000010111000010001000011110100111000010011101110011110110000111000110111001000111000011100111000111001111000011110111100011000011100101100111000010011000010011100001000100011100101100001110000110000111001010111101110001110101111000111011110001111000110011100011101111011110111001110001011000111000111000011110011100001100001110000100001110011000010011100011110001100010011110001111010011101111000110001111000011011110010001111000011000011100111000111010001111000100010110111010001110100001111000011110001111011100111011000011110011000010000110111000010000110001111000100001000010111000111000011000111001001110001110110010011100001111010111000100011000011100011001100011100001000011110000110011001111001000111100011110000111000010111101110010011100011110110001001111001000111011001110000111100011110111001000010010111001100110011000011000011110000110001001111011110111000011000100111011101100011010011001111001000010000111001111001100010000100111001000111100001011110000111101111001111011011100100010011110001001001110010000100011000011001000110001000111001100011100011110111100011110011010011110000110000110001111010011110001111000111100110000111000011000111101110000111000111010000111000110011110001110000111001111001110000111101110010000111100011110000111010000110000111001110000111100010000110000111100111011010001110001011101111000101001010110010111000011001110001111011110000100011100001100010111100001110000110000100001100011100011100111101110011110001001001111001100100001111010011000111011000010000111001110011000111000110011100001110111011110111011101111001100001100001111000010001110011110001001000111001111001010111100011110110010000101110111100011000010000101110000100110000111100011100010111001000011011100001110001110111100001111011001110001001000011000111101000110001110001001110001100001111001001101100111100011100111000111011110111100111000111101101111000111101001000011010011100011110000100001100001111000011101110111001111010010001110011110001111011110011110001001000011110011100001000100111100001001110111100111000010011000011000110001000010001110110001111000011110000110000110110111101111001110001011101000011110011100100011110011001100001100001110001001110000111100011110001100001100011110000110111100100011000100011110001110011100111100011110111000011101111000111100010011100001100011011011101111001000111100010001000010001110000111011001111000110001110011101100001110010000110011110000100101111000111000110110100001111000010001110011001110001110111000011110001110110010001111000111100001111000100011110001000111010001110011101001110111100011101000011100100011011101100001110000100011101100001110001100100001000100111100001100110001001111001110011110000110000111001111011110000111000111100011101100001111000011110001011100001000010010001100001111001111000110000111101111000011000110000111100011110001110111011100111000111011100001110010011000111000011110001100011011000100111000011100110011100011110000101011110110001100001000011100011001100110010001111011001000011000011110000100001100001000010001111000100011100011101110011110000111011110000110000100010001011010000111100111100001111001110000111100011110011100001001100001011110001111010000111001110010001110011011100110100001100001001101111011110011000111000011000111000100001110111001100001111000011110111100001011110000100011000011101110110100011110011100001101100011001110110011100111011101100111101111000111100011101100100111100110000111001010011110001101111000110000111000011001111000111000010111101000111000011100001110111001100011011110011010001100001111011101100001111000111101100100011000011100011101111011011000011101111001111000110001111000010001010000110011100110011110011110000111000110011110000100011100011110000110001100001110011101111000011001111000011110011000011110100001100011000011100001000011110001100111100001100111001100111100001100110011110010001100111100110011110001101111001100011110011110110011000111100001101111000110100001110000100111100001100001100001110111000111100001000011100011110011010000111100001110001111001111001100001100001000011110001111000111011100010001100111011000111100110111000111000111000111101110001111011110001110000111000110011000011000010000110000100001111001110001100110001100111101100001100011110110111100111001100001111001000110000101110000111011000111011011011000110111100011110001111000110000110001001110011110111100111100001110000101110000100111000111100010000110001111000100001100100001100001100011010100011101000110000110010011100011100011001000111100011001111000111101100011100001101001110000111101000011000110001110001100001001000100011000011110000111100001111001110000111000011110001001100001111001100111001111001100110100100100001101100101110111000100011110011110011100011100001101111001111001000011000011010001101111001011110001111010110010010100011100001110011000111100001110010111010011100010010001111000011100011000011001000110000100010000111000011100011110010001110111001110100111000010011001110111000011100001001111001110011000010111100011110110011110000111011011100011110100001100001111000111011110011101000010111100111000010001111000111011110101110011011011000110000110001001111000111010001101100001100110000100001100011110001000011110011001000110110001111001110000101011110110001100001011100111010111001111010001111000111000110110011110101100001111000100011100100001001111001111000111101111000011110001100001100100001110001111000100011110000111101011110010000101111011110001110011110001110001100111100110100110011101011110111000011100001100001111001100001100001000011110100100111100011000010001111000111001001100010001111010100001010111100111100110000100011100010111000011110000111100111000011000011100110011100111101111001111011110011110001101110010001110110011001110111100100111101100011100111100001110100110011000100001111001111011000110000110000111001111000010011000101001111001111000111000011110001111001110000111011000011100011100111101111000100110110000101111011000110110111000101110000110011110111100111100110000111101100011101110011110011100001111000100001100011110001000110000110001110011110100011000110001000011100011110000110011000111000010001010000110000111100100011001111001111011110011000100111100110001110001111011101100011110010011100001111000100011011001000010001111000111100001111001100110000110110011001110000110000100001111000111100100111100011101100111000011000111100001111000011110111101010000100111011001110110001111001100111000011001001100001100001000011000011000110000111011110011101110011110011000111000111000110110000111101101110011110011110001111000011110001000111101100011110010001011000011110001110001111001001111000011"));



enum Shape { horBar, plus, j, vertBar, square };

char getPieceWidth(Shape currentPieceShape) {
	switch (currentPieceShape) {
	case horBar:
		return 4;
	case plus:
		return 3;
	case j:
		return 3;
	case vertBar:
		return 1;
	case square:
		return 2;
	}
};

char getPieceHeight(Shape currentPieceShape) {
	switch (currentPieceShape) {
	case horBar:
		return 1;
	case plus:
		return 3;
	case j:
		return 3;
	case vertBar:
		return 4;
	case square:
		return 2;
	}
};

bool checkCanMoveLeft(Shape currentPieceShape, char currentPiecePos[2], bool rows[NR_OF_ROWS][NR_OF_COLUMNS]) {
	if (currentPiecePos[1] == 0) {
		return false;
	}



	char xPos = currentPiecePos[1] - 1;
	char yPos = currentPiecePos[0];
	char yPosMinusOne = currentPiecePos[0] - 1;
	if (yPosMinusOne < 0) {
		yPosMinusOne = NR_OF_ROWS + yPosMinusOne;
	}
	char yPosMinusTwo = currentPiecePos[0] - 2;
	if (yPosMinusTwo < 0) {
		yPosMinusTwo = NR_OF_ROWS + yPosMinusTwo;
	}
	char yPosMinusThree = currentPiecePos[0] - 3;
	if (yPosMinusThree < 0) {
		yPosMinusThree = NR_OF_ROWS + yPosMinusThree;
	}

	switch (currentPieceShape) {
	case horBar:
		if (rows[yPos][xPos]) {
			return false;
		}
		else {
			return true;
		}
	case plus:
		if (
			rows[yPos][xPos + 1] ||
			rows[yPosMinusOne][xPos] ||
			rows[yPosMinusTwo][xPos + 1]
			) {
			return false;
		}
		else {
			return true;
		}
	case j:
		if (
			rows[yPos][xPos + 2] ||
			rows[yPosMinusOne][xPos + 2] ||
			rows[yPosMinusTwo][xPos]
			) {
			return false;
		}
		else {
			return true;
		}
	case vertBar:
		if (
			rows[yPos][xPos] ||
			rows[yPosMinusOne][xPos] ||
			rows[yPosMinusTwo][xPos] ||
			rows[yPosMinusThree][xPos]


			) {
			return false;
		}
		else {
			return true;
		}
	case square:
		if (rows[yPos][xPos] ||
			rows[yPosMinusOne][xPos]
			) {
			return false;
		}
		else {
			return true;
		}
	}

	return true;
};

bool checkCanMoveRight(Shape currentPieceShape, char currentPiecePos[2], bool rows[NR_OF_ROWS][NR_OF_COLUMNS]) {
	if (currentPiecePos[1] + getPieceWidth(currentPieceShape) >= 7) {
		return false;
	}


	// debugger;

	char xPos = currentPiecePos[1] + 1;
	char yPos = currentPiecePos[0];
	char yPosMinusOne = currentPiecePos[0] - 1;
	if (yPosMinusOne < 0) {
		yPosMinusOne = NR_OF_ROWS + yPosMinusOne;
	}
	char yPosMinusTwo = currentPiecePos[0] - 2;
	if (yPosMinusTwo < 0) {
		yPosMinusTwo = NR_OF_ROWS + yPosMinusTwo;
	}
	char yPosMinusThree = currentPiecePos[0] - 3;
	if (yPosMinusThree < 0) {
		yPosMinusThree = NR_OF_ROWS + yPosMinusThree;
	}

	switch (currentPieceShape) {
	case horBar:
		if (rows[yPos][xPos + 3]) {
			return false;
		}
		else {
			return true;
		}
	case plus:
		if (
			rows[yPos][xPos + 1] ||
			rows[yPosMinusOne][xPos + 2] ||
			rows[yPosMinusTwo][xPos + 1]
			) {
			return false;
		}
		else {
			return true;
		}
	case j:
		//std::cout << '\a';
		if (
			rows[yPos][xPos + 2] ||
			rows[yPosMinusOne][xPos + 2] ||
			rows[yPosMinusTwo][xPos + 2]
			) {
			return false;

		}
		else {
			return true;
		}
	case vertBar:
		if (
			rows[yPos][xPos] ||
			rows[yPosMinusOne][xPos] ||
			rows[yPosMinusTwo][xPos] ||
			rows[yPosMinusThree][xPos]
			) {
			return false;
		}
		else {
			return true;
		}
	case square:
		if (rows[yPos][xPos + 1] ||
			rows[yPosMinusOne][xPos + 1]) {
			//std::cout << '\a';
			return false;
		}
		else {
			return true;
		}
	}

	return true;
};

bool checkIsPartOfCurrentPiece(char y, char x, Shape currentPieceShape, char currentPiecePos[2]) {
	int testCurrY = currentPiecePos[0];
	int testCurrX = currentPiecePos[1];

	switch (currentPieceShape) {
	case horBar:
		if (
			y == currentPiecePos[0] &&
			x >= currentPiecePos[1] &&
			x < currentPiecePos[1] + 4
			) {
			return true;
		}
		else {
			return false;
		}
	case plus:
		if (
			(y == currentPiecePos[0] && x == currentPiecePos[1] + 1) ||
			(y == currentPiecePos[0] - 1 && x == currentPiecePos[1]) ||
			(y == currentPiecePos[0] - 1 && x == currentPiecePos[1] + 1) ||
			(y == currentPiecePos[0] - 1 && x == currentPiecePos[1] + 2) ||
			(y == currentPiecePos[0] - 2 && x == currentPiecePos[1] + 1) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 1) && x == currentPiecePos[1]) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 1) && x == currentPiecePos[1] + 1) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 1) && x == currentPiecePos[1] + 2) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 2) && x == currentPiecePos[1] + 1)
			) {
			return true;
		}
		else {
			return false;
		}
	case j:
		if (
			(y == currentPiecePos[0] && x == currentPiecePos[1] + 2) ||
			(y == currentPiecePos[0] - 1 && x == currentPiecePos[1] + 2) ||
			(y == currentPiecePos[0] - 2 && x == currentPiecePos[1]) ||
			(y == currentPiecePos[0] - 2 && x == currentPiecePos[1] + 1) ||
			(y == currentPiecePos[0] - 2 && x == currentPiecePos[1] + 2) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 1) && x == currentPiecePos[1] + 2) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 2) && x == currentPiecePos[1]) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 2) && x == currentPiecePos[1] + 1) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 2) && x == currentPiecePos[1] + 2)
			) {
			return true;
		}

		else {
			return false;
		}
	case vertBar:
		if (
			y > currentPiecePos[0] - 4 &&
			y <= currentPiecePos[0] &&
			x == currentPiecePos[1]
			) {
			return true;
		}


		if (
			(y > NR_OF_ROWS + (currentPiecePos[0] - 4) &&
				y < NR_OF_ROWS &&
				x == currentPiecePos[1])) {
			return true;
		}

		return false;

	case square:
		if (
			(y == currentPiecePos[0] && x == currentPiecePos[1]) ||
			(y == currentPiecePos[0] && x == currentPiecePos[1] + 1) ||
			(y == currentPiecePos[0] - 1 && x == currentPiecePos[1]) ||
			(y == currentPiecePos[0] - 1 && x == currentPiecePos[1] + 1) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 1) && x == currentPiecePos[1]) ||
			(y == NR_OF_ROWS + (currentPiecePos[0] - 1) && x == currentPiecePos[1] + 1)
			) {
			return true;
		}
		else {
			return false;
		}
	default:
		return false;
	}
};

void addPieceToMap(bool rows[NR_OF_ROWS][NR_OF_COLUMNS], Shape currentPieceShape, char currentPiecePos[2]) {
	int y = currentPiecePos[0];
	int x = currentPiecePos[1];
	switch (currentPieceShape) {
	case horBar:

		for (int i = 0; i < 4; i++) {
			rows[currentPiecePos[0]][currentPiecePos[1] + i] = 1;
		}
		break;
	case plus:
		rows[currentPiecePos[0]][currentPiecePos[1] + 1] = 1;
		if (currentPiecePos[0] == 0) {
			rows[NR_OF_ROWS - 1][currentPiecePos[1]] = 1;
			rows[NR_OF_ROWS - 1][currentPiecePos[1] + 1] = 1;
			rows[NR_OF_ROWS - 1][currentPiecePos[1] + 2] = 1;
			rows[NR_OF_ROWS - 2][currentPiecePos[1] + 1] = 1;
		}
		else if (currentPiecePos[0] == 1) {
			rows[0][currentPiecePos[1]] = 1;
			rows[0][currentPiecePos[1] + 1] = 1;
			rows[0][currentPiecePos[1] + 2] = 1;
			rows[NR_OF_ROWS - 1][currentPiecePos[1] + 1] = 1;
		}
		else {
			rows[currentPiecePos[0] - 1][currentPiecePos[1]] = 1;
			rows[currentPiecePos[0] - 1][currentPiecePos[1] + 1] = 1;
			rows[currentPiecePos[0] - 1][currentPiecePos[1] + 2] = 1;
			rows[currentPiecePos[0] - 2][currentPiecePos[1] + 1] = 1;
		}
		break;
	case j:

		rows[currentPiecePos[0]][currentPiecePos[1] + 2] = 1;
		if (currentPiecePos[0] == 0) {
			rows[NR_OF_ROWS - 1][currentPiecePos[1] + 2] = 1;
			rows[NR_OF_ROWS - 2][currentPiecePos[1]] = 1;
			rows[NR_OF_ROWS - 2][currentPiecePos[1] + 1] = 1;
			rows[NR_OF_ROWS - 2][currentPiecePos[1] + 2] = 1;
		}
		else if (currentPiecePos[0] == 1) {
			rows[0][currentPiecePos[1] + 2] = 1;
			rows[NR_OF_ROWS - 1][currentPiecePos[1]] = 1;
			rows[NR_OF_ROWS - 1][currentPiecePos[1] + 1] = 1;
			rows[NR_OF_ROWS - 1][currentPiecePos[1] + 2] = 1;
		}
		else {
			rows[currentPiecePos[0] - 1][currentPiecePos[1] + 2] = 1;
			rows[currentPiecePos[0] - 2][currentPiecePos[1]] = 1;
			rows[currentPiecePos[0] - 2][currentPiecePos[1] + 1] = 1;
			rows[currentPiecePos[0] - 2][currentPiecePos[1] + 2] = 1;
		}
		break;
	case vertBar:
		rows[currentPiecePos[0]][currentPiecePos[1]] = 1;

		if (currentPiecePos[0] == 0) {
			rows[NR_OF_ROWS - 1][currentPiecePos[1]] = 1;
			rows[NR_OF_ROWS - 2][currentPiecePos[1]] = 1;
			rows[NR_OF_ROWS - 3][currentPiecePos[1]] = 1;
		}
		else if (currentPiecePos[0] == 1) {
			rows[NR_OF_ROWS - 1][currentPiecePos[1]] = 1;
			rows[NR_OF_ROWS - 2][currentPiecePos[1]] = 1;
			rows[0][currentPiecePos[1]] = 1;
		}
		else if (currentPiecePos[0] == 2) {
			rows[NR_OF_ROWS - 1][currentPiecePos[1]] = 1;
			rows[0][currentPiecePos[1]] = 1;
			rows[1][currentPiecePos[1]] = 1;
		}
		else {
			for (int i = 1; i < 4; i++) {
				rows[currentPiecePos[0] - i][currentPiecePos[1]] = 1;
			}
		}

		break;
	case square:
		rows[currentPiecePos[0]][currentPiecePos[1]] = 1;
		rows[currentPiecePos[0]][currentPiecePos[1] + 1] = 1;
		if (currentPiecePos[0] == 0) {
			rows[NR_OF_ROWS - 1][currentPiecePos[1]] = 1;
			rows[NR_OF_ROWS - 1][currentPiecePos[1] + 1] = 1;
		}
		else {
			rows[currentPiecePos[0] - 1][currentPiecePos[1]] = 1;
			rows[currentPiecePos[0] - 1][currentPiecePos[1] + 1] = 1;
		}
		break;
	};
};


Shape getNextShape(Shape currentPieceShape) {
	switch (currentPieceShape) {
	case horBar:
		return plus;
	case plus:
		return j;
	case j:
		return vertBar;
	case vertBar:
		return square;
	case square:
		return horBar;
	}
};

bool checkWillCollide(Shape currentPieceShape, char currentPiecePos[2], bool rows[NR_OF_ROWS][NR_OF_COLUMNS]) {
	bool willCollide = false;
	char height = getPieceHeight(currentPieceShape);
	char width = getPieceWidth(currentPieceShape);
	char bottomYPosition = currentPiecePos[0] - height;

	//if (currentPiecePos - height + 1 == 0) {
	//	return true;
	//}



	if (currentPieceShape == plus) {
		if (bottomYPosition < 0) {
			if (rows[NR_OF_ROWS + bottomYPosition][currentPiecePos[1] + 1]) {
				//std::cout << '\a';
				willCollide = true;
			}

			if (bottomYPosition + 1 < 0) {
				if (rows[NR_OF_ROWS + bottomYPosition + 1][currentPiecePos[1]] || rows[NR_OF_ROWS + bottomYPosition + 1][currentPiecePos[1] + 2]) {
					willCollide = true;
				}
			}
			else {
				if (rows[0][currentPiecePos[1]] || rows[0][currentPiecePos[1] + 2]) {
					willCollide = true;
				}
			}

		}
		else if (
			rows[currentPiecePos[0] - height + 1][currentPiecePos[1]] ||
			rows[currentPiecePos[0] - height][currentPiecePos[1] + 1] ||
			rows[currentPiecePos[0] - height + 1][currentPiecePos[1] + 2]
			) {
			willCollide = true;
			//std::cout << '\a';
		}
	}
	else {
		for (char i = currentPiecePos[1]; i < currentPiecePos[1] + width; i++) {
			if (bottomYPosition < 0 && rows[NR_OF_ROWS + bottomYPosition][i]) {

				willCollide = true;
			}
			else if (bottomYPosition >= 0 && rows[bottomYPosition][i]) {
				//std::cout << '\a';
				willCollide = true;
			}

		}
	}

	return willCollide;
};




// move 40002 should have highesty 38, totalheight 10738, settledpieces 6826
// unoptimized it takes around 2400ms - 2600ms

// move 11745 should have settledpieces 2022

// after only update rows for settled pieces: 1000000 takes around 2900 ms.
long long testMove = 10000000;


void updateMap(bool rows[NR_OF_ROWS][NR_OF_COLUMNS], Shape currentPieceShape, char currentPiecePos[2]) {
	for (int rowNr = 0; rowNr < NR_OF_ROWS; rowNr++) {
		//if (rowNr == 23 && ( currMove == 62 || currMove == 63 || currMove == 584)) {
			//std::cout << '\a';
		//}
		for (int x = 0; x < NR_OF_COLUMNS; x++) {

			if (checkIsPartOfCurrentPiece(rowNr, x, currentPieceShape, currentPiecePos)) {
				rows[rowNr][x] = 1;
			}
		};

	};
}

int main() {
	bool data[DATA_LENGTH_E] = { 0 };
	for (int i = 0; i < DATA_LENGTH_E; i++) {
		data[i] = dataBitsetE.test(DATA_LENGTH_E- 1 - i);
	}
	int dataLength = DATA_LENGTH_E;

	bool rows[NR_OF_ROWS][NR_OF_COLUMNS] = { 0 };
	for (int i = 0; i < NR_OF_COLUMNS; i++) {
		rows[0][i] = 1;
	}
	//rows[0].set();
	char highestY = 0;
	Shape currentPieceShape = horBar;
	char currentPiecePos[2] = { highestY + getPieceHeight(currentPieceShape) + 3, 2 };
	int moveCounter = 0;
	long long nrOfSettledPieces = 0;
	long long totalHeight = 0;
	bool hasCurrentPiecePassedHighestY = false;

	auto start_time = std::chrono::high_resolution_clock::now();

	int currMove = 0;
	for (currMove = 0; currMove < testMove + 1; currMove++) {

		if (nrOfSettledPieces == 2022) {
			break;
		}


		if (moveCounter == dataLength) {
			moveCounter = 0;
		}
		if (data[moveCounter]) {
			if (checkCanMoveRight(currentPieceShape, currentPiecePos, rows)) {
				currentPiecePos[1] = currentPiecePos[1] + 1;
			}
		}
		else {
			if (checkCanMoveLeft(currentPieceShape, currentPiecePos, rows)) {
				currentPiecePos[1] = currentPiecePos[1] - 1;
			}
		}
		moveCounter++;

		if (checkWillCollide(currentPieceShape, currentPiecePos, rows)) {
			/*if (currMove > 1136 && currMove < 200001) {
				std::cout << '\a';
			}*/
			addPieceToMap(rows, currentPieceShape, currentPiecePos);

			char pieceHeight = getPieceHeight(currentPieceShape);
			if (currentPiecePos[0] - pieceHeight < 0 && !hasCurrentPiecePassedHighestY) {
				if (highestY == 0) {
					totalHeight += currentPiecePos[0];
				}
				else if (highestY == 1) {
					totalHeight += currentPiecePos[0] - 1;
				}
				else if (highestY == 2) {
					totalHeight += currentPiecePos[0] - 2;
				}
				else {
					totalHeight += (NR_OF_ROWS - highestY) + currentPiecePos[0];
				}
				highestY = currentPiecePos[0];
			}
			else if (currentPiecePos[0] > highestY && !hasCurrentPiecePassedHighestY) {
				totalHeight += currentPiecePos[0] - highestY;
				highestY = currentPiecePos[0];
			}

			currentPieceShape = getNextShape(currentPieceShape);
			hasCurrentPiecePassedHighestY = false;
			currentPiecePos[0] = highestY + getPieceHeight(currentPieceShape) + 3;
			if (currentPiecePos[0] >= NR_OF_ROWS) {
				currentPiecePos[0] = currentPiecePos[0] - NR_OF_ROWS;

				for (int i = 0; i <= currentPiecePos[0]; i++) {
					for (int j = 0; j < NR_OF_COLUMNS; j++) {
						rows[i][j] = 0;
					}

				}
				for (int i = highestY + 1; i < NR_OF_ROWS; i++) {
					for (int j = 0; j < NR_OF_COLUMNS; j++) {
						rows[i][j] = 0;
					}
				}
			}
			else {

				for (int i = highestY + 1; i <= currentPiecePos[0]; i++) {


					for (int j = 0; j < NR_OF_COLUMNS; j++) {
						rows[i][j] = 0;
					}
				}
			}

			currentPiecePos[1] = 2;
			nrOfSettledPieces++;
		}
		else {
			currentPiecePos[0] = currentPiecePos[0] - 1;

			if (currentPiecePos[0] == highestY) {
				hasCurrentPiecePassedHighestY = true;
			}
			if (currentPiecePos[0] == -1) {
				currentPiecePos[0] = NR_OF_ROWS - 1;
			}
		}

	};

	for (int i = 0; i < 10; i++) {
		for (int j = 0; j < 7; j++) {
			if (rows[i][j]) {
				std::cout << '@';
			}
			else {
				std::cout << '.';
			}
			
		}
		std::cout << '\n';
	}

	std::cout << "highestY " << +highestY << "\n";
	std::cout << "totalHeight " << +totalHeight << "\n";
	std::cout << "currMove " << +currMove - 1 << "\n";
	std::cout << "nrOfSettledPieces " << +nrOfSettledPieces << "\n";

	auto end_time = std::chrono::high_resolution_clock::now();
	auto time = end_time - start_time;

	std::cout << "took " << time / std::chrono::milliseconds(1) << "ms to run.\n";

}