function addTogetherJS(elem) 
{
     elem.insertAdjacentHTML('afterbegin','<script> TogetherJSConfig_autoStart = true </script> ');
      elem.insertAdjacentHTML('afterbegin',' <script> TogetherJSConfig_suppressJoinConfirmation = true </script>');
      elem.insertAdjacentHTML('afterbegin','<script>TogetherJSConfig_hubBase = "https://sustaining-classic-beam.glitch.me/"; </script>');
   elem.insertAdjacentHTML('afterbegin','script src="https://togetherjs.com/togetherjs-min.js"></script>');
}
