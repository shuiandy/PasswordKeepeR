$(document).ready(function () {
  $('.pass-gen').click(function (e) {
    e.preventDefault();
     $('.pw-container').slideToggle();
  })
  const passwordCharacters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%&*',
  };

  $('#generateButton').submit(function (event) {
    event.preventDefault();
    event.stopPropagation();
    const isUpper

    const passwordLength = $('input[name="passwordLength"]').val();

    const passwordOptions = [];
    $.each($('input[name="passwordCharacters"]:checked'), function () {
      passwordOptions.push($(this).val());
    });

    const alphabets = passwordOptions
      .map((key) => {
        return passwordCharacters[key];
      })
      .join('');

    const randomize = function (length) {
      return Math.floor(Math.random() * length);
    };
    const remainderLength = passwordLength - passwordOptions.length;
    const remainingChars = Array.from({ length: remainderLength })
      .map(() => {
        return alphabets[randomize(alphabets.length)];
      })
      .join('');
    const prefix = passwordOptions
      .map((key) => {
        const alphabet = passwordCharacters[key];
        return alphabet[randomize(alphabet.length)];
      })
      .join('');

    const output = prefix + remainingChars;
    $('input[name="password"]').val(prefix + remainingChars);
  });
});
