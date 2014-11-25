'use strict';
define(['jquery'], function ($) {
    var Sudoku;
    Sudoku = (function () {

        function initializeGridArray() {
            for (var row = 0; row < this._size; row++) {
                this.grid[row] = [];
                for (var col = 0; col < this._size; col++) {
                    var currentValue = parseInt(this.gridAsString[row * this._size + col]);
                    if (currentValue > 0 && currentValue < 10) {
                        this.setValue(row, col, currentValue);
                    }
                }
            }
        }

        function Sudoku(stringRepresentation, gridSize, selector) {
            this.$container = selector ? $(selector) : $("#game-board");
            this._size = gridSize || 9;
            this.gridAsString = stringRepresentation
                || '057081002030000000000500040304070580290000037075040206040008000000000090900410370';
            this.grid = [];
            initializeGridArray.call(this);
            return this;
        }

        Sudoku.prototype.renderSudoku = function () {
            for (var row = 0; row < this._size; row++) {
                var $row = this.$container.find(".row-" + row);
                for (var col = 0; col < this._size; col++) {
                    var currentValue = this.grid[row][col];
                    if (this.grid[row][col] > 0) {
                        var currentInput = $row.find('.col-' + col).find('.sudoku-input');
                        currentInput.val(currentValue);
                        currentInput.attr('disabled', true);
                    }
                }
            }
        };

        Sudoku.prototype.getValue = function (row, col) {
            return this.grid[row][col];
        };

        Sudoku.prototype.setValue = function (row, col, value) {
            if (value == null) {
                this.grid[row][col] = value;
                return this;
            }

            if (isNaN(value) || value > 9 || value < 1) {
                throw new Error("Invalid value is passed to the sudoku grid")
            } else {
                this.grid[row][col] = value;
            }

            return this;
        };

        Sudoku.prototype.cellIsValid = function (row, col) {
            return !(this.checkIfValidInRowOrCol(row, col) || this.checkInIndividualGrids(row, col));
        };

        Sudoku.prototype.checkIfValidInRowOrCol = function (row, col) {
            var currentValue = this.getValue(row, col);

            if (currentValue == null) {
                return false;
            }

            // Checking both vertically and horizontally at the same time
            for (var index = 0; index < this._size; index++) {
                if (index != row && this.grid[index][col] == currentValue) {
                    return true;
                }

                if (index != col && this.grid[row][index] == currentValue) {
                    return true;
                }
            }
            return false;
        };

        Sudoku.prototype.attachEvents = function () {
            var that = this;

            function enforceValidData($input) {
                var value = parseInt($input.val());

                if (isNaN(value)) {
                    value = null;
                } else {
                    if (parseInt(value, 10) > 9 || parseInt(value, 10) < 1) {
                        value = null;
                    } else {
                        value = parseInt(value, 10);
                    }
                }

                $input.val(value);
                return value;
            }

            function onInputChange() {
                var $this = $(this);
                var correctValue = enforceValidData($this);
                var colElement = $this.parent();
                var rowElement = colElement.parent();
                var colClass = colElement.attr('class');
                var rowClass = rowElement.attr('class');

                var col = parseInt(colClass.slice(colClass.indexOf('col-') + 4, 5), 10);
                var row = parseInt(rowClass.slice(rowClass.indexOf('row-') + 4, 5), 10);
                that.setValue(row, col, correctValue);

                if (!that.cellIsValid(row, col)) {
                    $this.addClass('bad-move')
                } else if ($this.hasClass('bad-move') || correctValue == null) {
                    $this.removeClass('bad-move');
                }
            }

            this.$container.on('change', '.sudoku-input', function () {
                onInputChange.call(this);
            });

            this.$container.on('keyup', '.sudoku-input', function () {
                onInputChange.call(this);
            });
        };

        Sudoku.prototype.checkInIndividualGrids = function (row, col) {
            var r = Math.floor(col / 3);
            var c = Math.floor(row / 3);

            var startCol = r * 3;
            var startRow = c * 3;

            var endCol = (r + 1) * 3;
            var endRow = (c + 1) * 3;

            var value = this.getValue(row, col);
            for (var currentRow = startRow; currentRow < endRow; currentRow++) {
                for (var currentCol = startCol; currentCol < endCol; currentCol++) {
                    if (this.getValue(currentRow, currentCol) == null || currentRow == row || currentCol == col)
                        continue;

                    if (this.getValue(currentRow, currentCol) == value)
                        return true;
                }
            }
            return false;
        };

        return Sudoku;
    }());
    return Sudoku;
});