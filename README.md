<h2>Using</h2>
<p>You can use it on any element, that can change its position on the page, for example on sliders or modals. All motion of these objects will be accompanied by blurring. But it should be understood that SVG filter can blurring only in left-right or top-bottom directions. If your element moves diagonally that it may be unpretty</p>

<h2>How it works</h2>
<p>Plugin creates an invisible SVG element on your page, that contains blurring filters. It checks defference of current offset and offset, which was on previous animation frame by X and Y axes, multiplies it on the blurring intensity and sets the respective values on SVG filter on every animation frame .</p>

<h2>API</h2>
<h5>Init:</h5>
```
$("selector").blurMotionEffect();
```
<h5>Destroy:</h5>
```
$("selector").destroyBlurMotionEffect();
```

<h5>Functions:</h5>
| Function                | Description                | Parametres                           | Returned value       |
| ------------------------| -------------------------- | ------------------------------------ | -------------------- |
| blurMotionEffect        | Init blur motion effect    | (number) intensity (default is 0.25) | jQuery element       |
| destroyBlurMotionEffect | Destroy blur motion effect | None                                 | jQuery element       |
| setBlurMotionIntensity  | Set blur intensity         | (number) intensity (default is 0.25) | jQuery element       |
| getBlurMotionIntensity  | Get blur intensity         | None                                 | Float intensity      |
| setBlurMotionLastOffset | Set last offset            | Offset object*                       | jQuery element       |
| getBlurMotionLastOffset | Get last offset            | None                                 | Offset object*       |
| getBlurMotionFilter     | Get SVG Filter             | None                                 | jQuery element       |
| createBlurMotionFilter  | Create SVG Filter          | None                                 | jQuery element       |
| getBlurMotionValues     | Get actual blur values     | None                                 | Blur values object** |
| setBlurMotionValues     | Set blur values            | Blur values object**                 | jQuery element       |

<b>* Offset object:</b> 
```
{
  x: 0, //number
  y: 0  //number
}
```
this can be obtained by using $("...").offset();

<b>** Blur values is an object, that contained information about the blurring element along the axes X and Y:</b>
```
{
  x: 0, //number
  y: 0  //number
}
```

<h5>Events:</h5>
<p>You can bind blurMotionEffectRender event. Be dangerous with performance. It calls in every animation frame</p>
```
$("selector").on("blurMotionEffectRender", function(){
  //do something
});
```

<p><b>Notice:</b> most of jQuery sliders are rebased their slides after scrolling for an infinite scroll. Therefore changing the offset, which means on one animation frame works blur effect. To avoid this flickering you should use events of start and end of scrolling. For example, for carouFredSel plugin it looks like:
</p>
```
...
onBefore: function () {
	$(this).blurMotionEffect();
},
onAfter: function () {
	$(this).destroyBlurMotionEffect();
}
...
```
