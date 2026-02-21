document.querySelectorAll('.img-box').forEach(box => {
  box.addEventListener('click', () => {
    document.querySelectorAll('.img-box').forEach(b => b.classList.remove('active'));
    box.classList.add('active');
  });
});



document.querySelectorAll('.img-box').forEach(box => {
  box.addEventListener('click', () => {
    document.querySelectorAll('.box-content, .box-content1').forEach(el => {
      el.classList.remove('active');
    });

    box.querySelector('.box-content')?.classList.add('active');
    box.querySelector('.box-content1')?.classList.add('active');
  });
});


 document.querySelectorAll('.img-box').forEach(box => {
    box.addEventListener('click', function () {
      const imgSrc = this.querySelector('img').getAttribute('src');
      const title = this.querySelector('h5').innerText;
      const desc = this.querySelector('p').innerText;

      // Change background image
      document.querySelector('.bg-header').style.background =
        `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${imgSrc}') no-repeat center center`;
      document.querySelector('.bg-header').style.backgroundSize = "cover";

      // Change hero content
      document.getElementById('hero-heading').innerHTML = title;
      document.getElementById('hero-text').innerHTML = desc;
    });
  });