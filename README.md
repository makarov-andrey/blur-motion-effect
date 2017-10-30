<h2>Usage</h2>
<p>You can use it on any element that can change its position on the page, for example on sliders or modals. All motion of these objects will be accompanied by blurring. Do not forget that SVG filter blurs only in left-right or top-bottom directions. If your element moves diagonal it may be spoiled.</p>

<h2>How does it work</h2>
<p>Plugin creates an invisible SVG element on your page that contains blurring filters. It checks the difference between offsets of current and previous animation frame by X and Y axes, then multiplies it on the blurring intensity and sets the respective values on SVG filter on every animation frame. </p>

<h2>API</h2>
<h5>Init:</h5>

```javascript
$("selector").blurMotionEffect();
```

<h5>Destroy:</h5>

```javascript
$("selector").destroyBlurMotionEffect();
```

<h5>Functions:</h5>

| Function                 | Parameters                           | Returned value       |
| ------------------------ | ------------------------------------ | -------------------- |
| blurMotionEffect         | (number) intensity (default is 0.25) | jQuery collection    |
| destroyBlurMotionEffect  | -                                    | jQuery collection    |
| setBlurMotionIntensity   | (number) intensity (default is 0.25) | jQuery collection    |
| getBlurMotionIntensity   | -                                    | number               |
| setBlurMotionLastOffset  | Offset object*                       | jQuery collection    |
| getBlurMotionLastOffset  | -                                    | Offset object*       |
| getBlurMotionFilter      | -                                    | jQuery collection    |
| createBlurMotionFilter   | -                                    | jQuery collection    |
| getBlurMotionValues      | -                                    | Blur values object** |
| setBlurMotionValues      | Blur values object**                 | jQuery collection    |

<b>* Offset object:</b> 

```javascript
var offset = {
  x: 0,
  y: 0
}
```
that can be obtained by using $("...").offset();

<b>** Blur values is an object, that contained information about the blurring element along the axes X and Y:</b>

```javascript
var blur = {
  x: 0,
  y: 0
}
```

<h5>Events:</h5>
<p>You can bind blurMotionEffectRender event. Be careful with this action. It calls in every animation frame</p>

```javascript
$("selector").on("blurMotionEffectRender", function(){
  //do something
});
```

<p><b>Notice:</b> most of jQuery sliders rebase its slides after scrolling for an infinite scroll. Therefore the slider would blur after changing  the offset in one animation frame. To avoid this flickering you should use events of start and end of scrolling. For example, for carouFredSel plugin it looks like:</p>

```javascript
$("#carousel").carouFredSel({
    onBefore: function () {
    	$(this).blurMotionEffect();
    },
    onAfter: function () {
    	$(this).destroyBlurMotionEffect();
    }
});
```
