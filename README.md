<h2>How it works</h2>
<p>Plugin creates an invisible SVG element on your page, that contains blurring filters. On every animation frame it checks defference of current offset and offset, which was on previous animation frame by X and Y axes, multiplies it on the blurring intensity and sets the respective values on SVG filter</p>

<h2>Blur Motion Effect API</h2>
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
| getBlurMotionLastOffset | Set last offset            | None                                 | Offset object*       |
| getBlurMotionFilter     | Get SVG Filter             | None                                 | jQuery element       |
| createBlurMotionFilter  | Create SVG Filter          | None                                 | jQuery element       |
| getBlurMotionValues     | Get actual blur values     | None                                 | Blur values object** |
| setBlurMotionValues     | Set blur values            | Blur values object**                 | jQuery element*      |
```
* Offset object: 
{
  x: 0, //number
  y: 0 //number
}
this can be obtained by using $("...").offset();

** Blur values is an object, that contained information about the blurring element along the axes X and Y:
{
  x: 0, //number
  y: 0 //number
}
```

<h5>Events:</h5>
<p>You can binding on blurMotionEffectRender event. Be dangerous with performance, it will calling by every animation frame</p>
```
$("selector").on("blurMotionEffectRender", function(){
  //do something
});
```
