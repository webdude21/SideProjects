define(function () {
    require.config({
        paths: {
            'jquery': 'lib/jquery/dist/jquery.min',
            'Sudoku': 'game/sudoku-grid'
        }
    });

    require(['jquery', 'Sudoku'],
        function ($, Sudoku) {
            var currentGame = new Sudoku();

            $.get('templates/sudoku-board.html', function (template) {
                $('#game-board').html(template);
                currentGame.renderSudoku();
                currentGame.attachEvents();
            });
        });
});