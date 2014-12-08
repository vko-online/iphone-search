angular.module('test', []).directive('funky', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      var ng = angular.element;
      var flag = 0;
      var locked = false;
      var funky = {
        start: 0,
        end: 0,
        dist: 0,
        blurMax: 10,
        element: elem,
        parent: document.body,
        prefix: '',
        control: false,
        button: false,
        buttonText: 'cancel',
        class: ''
      }

        function init() {
          if (navigator.appName == "Netscape") {
            funky.prefix = '-webkit-';
          }
          funky.control = document.createElement('input');
          funky.button = document.createElement('button');
          ng(funky.button).text(funky.buttonText);
          funky.parent.appendChild(funky.control);
          funky.parent.appendChild(funky.button);
          ng(funky.control).addClass('funky');
          ng(funky.button).addClass('funky-button');
          
          ng(funky.button).on('click', function(){
            funky.start = 0; 
            funky.end = 0; 
            funky.dist = 0;
            ng(funky.element).removeClass('blur');
            ng(funky.element).css(funky.prefix + 'filter', 'blur(0px)');
            ng(funky.control).removeClass('open');
            ng(funky.button).removeClass('open');
            locked = false;
          });
          ng(funky.control).bind('blur', function(){
            funky.start = 0; 
            funky.end = 0; 
            funky.dist = 0;
            ng(funky.element).removeClass('blur');
            ng(funky.element).css(funky.prefix + 'filter', 'blur(0px)');
            ng(funky.control).removeClass('open');
            ng(funky.button).removeClass('open');
            locked = false;
          });
        }


        function blurrer() {
          var val = funky.dist > funky.blurMax ? funky.blurMax : funky.dist;
          ng(funky.element).css(funky.prefix + 'filter', 'blur(' + val/2 + 'px)');
          if (val > funky.blurMax / 2) {
            ng(funky.element).addClass('blur');
            ng(funky.control).addClass('open');
            ng(funky.button).addClass('open');
            funky.control.focus();
            locked = true;
          }
          else{
            ng(funky.element).removeClass('blur');
            ng(funky.control).removeClass('open');
            ng(funky.button).removeClass('open');
            locked = false;
          }
         
        }
      ng(funky.parent).on('mousedown', function($event) {
        
        funky.start = $event.x;
        flag = 0;
        locked = false;
      });
      ng(funky.parent).on('mousemove', function($event) {
        console.log(funky);
        flag = 1;
        if(locked === false){
          
          funky.end = $event.x;
          var _t = funky.start !== 0 ? funky.end - funky.start : 0;
          funky.dist = _t >= 0 ? _t : 0;
          blurrer();
        }
        

      });
      ng(funky.parent).on('mouseup', function($event) {
        locked = true;
        if (flag === 1) {
          /*if(blurred){ 
            funky.start = 0; 
            funky.end = 0;
            funky.dist = 0;
            ng(funky.control).removeClass('open');
          }*/
        }
       
      });
      
      init();
    }
  }
});