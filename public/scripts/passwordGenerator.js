$(document).ready(function () {
  const passwordCharacters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%&*',
  };

  $('#generateButton').submit(function (event) {
    event.preventDefault();
    event.stopPropagation();

    const passwordLength = $('input[name="passwordLength"]').val();
    console.log(passwordLength);

    const passwordOptions = [];
    $.each($('input[name="passwordCharacters"]:checked'), function () {
      passwordOptions.push($(this).val());
    });
    console.log('passwordOptions:', passwordOptions);

    const alphabets = passwordOptions
      .map((key) => {
        return passwordCharacters[key];
      })
      .join('');
    console.log('alphabets', alphabets);

    const randomize = function (length) {
      return Math.floor(Math.random() * length);
    };
    const remainderLength = passwordLength - passwordOptions.length;
    console.log('remainderLength', remainderLength);
    const remainingChars = Array.from({ length: remainderLength })
      .map(() => {
        return alphabets[randomize(alphabets.length)];
      })
      .join('');
    console.log('remainingChars', remainingChars);
    const prefix = passwordOptions
      .map((key) => {
        const alphabet = passwordCharacters[key];
        return alphabet[randomize(alphabet.length)];
      })
      .join('');

    console.log(prefix, 'prefix');
    const output = prefix + remainingChars;
    console.log(output);
    $('input[name="password"]').val(prefix + remainingChars);
  });
});
