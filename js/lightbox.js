document.addEventListener('click', function(e){
  if(e.target.tagName === 'IMG' && e.target.parentElement.classList.contains('photo')) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 1000;
    overlay.innerHTML = `<img src="${e.target.src}" style="max-width:90%; max-height:90%;">`;
    overlay.addEventListener('click', ()=> overlay.remove());
    document.body.appendChild(overlay);
  }
});
