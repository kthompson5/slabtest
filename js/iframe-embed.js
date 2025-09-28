// Ensures responsive embed is focusable and accessible
(function(){
  const wrap = document.querySelector('.embed');
  if (!wrap) return;
  const frame = wrap.querySelector('iframe');
  if (frame) frame.setAttribute('title','Embedded SlabMetrics Report');
})();
