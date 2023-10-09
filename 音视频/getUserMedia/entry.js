const btn = document.getElementById('btn');
const video = document.getElementById('video');

btn.addEventListener('click', function () {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      console.log(stream);
      video.srcObject = stream;
    })
    .catch((err) => {
      console.log(err);
    });
});
