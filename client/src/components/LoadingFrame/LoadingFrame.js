import React from 'react'
import './LoadingFrame.css'
import gsap from "gsap";

const LoadingFrame = () => {

  let blendEases= (startEase, endEase, blender) => {
    var s = gsap.parseEase(startEase),
        e = gsap.parseEase(endEase),
        blender = gsap.parseEase(blender || "power3.inOut");
    return function(v) {
      var b = blender(v);
      return s(v) * (1 - b) + e(v) * b;
    };
}
gsap.set('svg', {
	visibility: 'visible'
})

let tl = gsap.timeline({
	repeat: -1
});
tl.to('#leader', {
	duration: 4,
	x: 36*3,
	ease: blendEases('circ.in', 'expo')
})
.to('.follower', {
	duration: 2,
	svgOrigin: gsap.utils.wrap(['328 300', '364 300', '400 300', '436 300', '472 300']),
	rotation: -180,
	stagger: {
		amount: 2
	},
	//ease: 'elastic(0.3, 0.8)'
	ease: blendEases('circ.in', 'expo')
}, 0)
.to('#whole', {
	x: 36,
	duration: 5,
	ease: 'linear',
}, 0)
.to('.follower', {
	duration: 1.5,
	stagger: {
		amount: 1,
		repeat: 1,
		yoyo: true
	},
	ease: blendEases('power3.in', 'expo'),
fillOpacity: 0
}, 0)

tl.timeScale(3)

  return (
    <div>
      <svg id="mainSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <g id="whole" fill="#FEFEFE" stroke="#FEFEFE" stroke-width="2">
          <circle id="leader" cx="328" cy="300" r="13"/>
          <circle class="follower" cx="364" cy="300" r="13"/>
          <circle class="follower" cx="400" cy="300" r="13"/>
          <circle class="follower" cx="436" cy="300" r="13"/>
          <circle class="follower" cx="472" cy="300" r="13"/>
        </g>
      </svg>
    </div>
  )
}

export default LoadingFrame
