(function(){
  const file = document.getElementById('img-file');
  const url  = document.getElementById('img-url');
  const loadBtn = document.getElementById('load-btn');
  const canvas = document.getElementById('cnv');
  const ctx = canvas.getContext('2d');
  const out = document.getElementById('centering-out');

  let img = new Image();
  let rect = { x: 40, y: 40, w: 200, h: 300 };
  let dragging = null;

  function loadImage(src){
    return new Promise((resolve,reject)=>{
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = src;
    });
  }
  function fitAndDraw(){
    canvas.width = Math.min(700, img.width);
    canvas.height = Math.min(900, img.height);
    const scale = Math.min(canvas.width/img.width, canvas.height/img.height);
    const w = img.width*scale, h = img.height*scale;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img, 0, 0, w, h);
    // draw rect
    ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2;
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    // handles
    const handles = getHandles();
    ctx.fillStyle = '#16a34a';
    for (const hdl of handles){ ctx.fillRect(hdl.x-4, hdl.y-4, 8, 8); }
    // centering numbers
    const left = rect.x, right = w - (rect.x + rect.w);
    const top = rect.y, bottom = h - (rect.y + rect.h);
    const horiz = (left/(left+right))*100 || 0;
    const vert  = (top/(top+bottom))*100 || 0;
    out.textContent = `Left ${horiz.toFixed(1)}% / Right ${(100-horiz).toFixed(1)}% • Top ${vert.toFixed(1)}% / Bottom ${(100-vert).toFixed(1)}%`;
  }
  function getHandles(){
    return [
      {name:'nw', x:rect.x, y:rect.y},
      {name:'ne', x:rect.x+rect.w, y:rect.y},
      {name:'sw', x:rect.x, y:rect.y+rect.h},
      {name:'se', x:rect.x+rect.w, y:rect.y+rect.h},
      {name:'move', x:rect.x+rect.w/2, y:rect.y+rect.h/2}
    ];
  }
  function hit(x,y){
    const hs = getHandles();
    for (const h of hs){
      if (Math.abs(x-h.x)<=8 && Math.abs(y-h.y)<=8) return h.name;
    }
    // inside rect -> move
    if (x>rect.x && x<rect.x+rect.w && y>rect.y && y<rect.y+rect.h) return 'drag';
    return null;
  }
  canvas.addEventListener('mousedown', (e)=>{
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    dragging = hit(x,y) || null;
    canvas.dataset.dx = x - rect.x;
    canvas.dataset.dy = y - rect.y;
    canvas.dataset.ox = x; canvas.dataset.oy = y;
  });
  canvas.addEventListener('mousemove', (e)=>{
    if (!dragging) return;
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const dx = x - parseFloat(canvas.dataset.ox), dy = y - parseFloat(canvas.dataset.oy);
    switch(dragging){
      case 'drag':
      case 'move':
        rect.x = x - parseFloat(canvas.dataset.dx);
        rect.y = y - parseFloat(canvas.dataset.dy);
        break;
      case 'nw':
        rect.w -= dx; rect.h -= dy; rect.x += dx; rect.y += dy; break;
      case 'ne':
        rect.w += dx; rect.h -= dy; rect.y += dy; break;
      case 'sw':
        rect.w -= dx; rect.h += dy; rect.x += dx; break;
      case 'se':
        rect.w += dx; rect.h += dy; break;
    }
    canvas.dataset.ox = x; canvas.dataset.oy = y;
    fitAndDraw();
  });
  window.addEventListener('mouseup', ()=> dragging=null);

  async function loadFromInputs(){
    try{
      if (url.value.trim()){
        img = await loadImage(url.value.trim());
      } else if (file.files[0]){
        img = await loadImage(URL.createObjectURL(file.files[0]));
      } else {
        alert('Choose a file or paste an image URL.'); return;
      }
      rect = { x: 40, y: 40, w: Math.min(280, img.width*0.4), h: Math.min(380, img.height*0.6) };
      fitAndDraw();
    } catch(e){
      console.error(e); alert('Could not load image.');
    }
  }
  if (loadBtn) loadBtn.addEventListener('click', loadFromInputs);
})(); 
